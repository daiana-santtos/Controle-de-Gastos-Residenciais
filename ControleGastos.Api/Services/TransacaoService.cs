using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    /// <summary>
    /// Serviço responsável pelas regras de negócio relacionadas às transações.
    /// Realiza operações de cadastro e consulta das transações financeiras.
    /// </summary>
    public class TransacaoService(AppDbContext context)
    {
        private readonly AppDbContext _context = context;

        /// <summary>
        /// Cria uma nova transação após validar as regras de negócio.
        /// </summary>
        /// <param name="dto">Dados necessários para criação da transação.</param>
        /// <returns>Objeto contendo os dados da transação criada.</returns>
        /// <exception cref="ArgumentException">
        /// Lançada quando a pessoa informada não é encontrada.
        /// </exception>
        /// <exception cref="InvalidOperationException">
        /// Lançada quando uma pessoa menor de idade tenta cadastrar uma receita.
        /// </exception>
        public async Task<TransacaoResponseDto> CriarTransacaoAsync(CriarTransacaoRequestDto dto)
        {
            //verifica se a pessoa existe
            var pessoa = await _context.Pessoas.
                FirstOrDefaultAsync(p => p.Id == dto.PessoaId) ?? throw new ArgumentException("Pessoa não encontrada.");

            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            {
                throw new InvalidOperationException("Pessoa menor de idade não pode criar transações do tipo receita.");
            }

            //mapeia dto -> entidade
            var transacao = new Transacao
            {
                PessoaId = dto.PessoaId,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                Descricao = dto.Descricao
            };

            await _context.Transacoes.AddAsync(transacao);
            await _context.SaveChangesAsync();

            return new TransacaoResponseDto
            {
                Id = transacao.Id,
                NomePessoa = pessoa.Nome,
                Valor = transacao.Valor,
                Tipo = (int)transacao.Tipo,
                Descricao = transacao.Descricao
            };
        }

        /// <summary>
        /// Retorna todas as transações cadastradas juntamente com o nome da pessoa
        /// responsável por cada uma delas.
        /// </summary>
        /// <returns>Lista de transações cadastradas.</returns>
        public async Task<List<TransacaoResponseDto>> ListarTransacoesAsync()
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Pessoa)
                .AsNoTracking()
                .ToListAsync();

            return [.. transacoes.Select(t => new TransacaoResponseDto
            {
                Id = t.Id,
                NomePessoa = t.Pessoa.Nome,
                Valor = t.Valor,
                Tipo = (int)t.Tipo,
                Descricao = t.Descricao
            })];
        }
    }
}
