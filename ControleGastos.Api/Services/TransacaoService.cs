using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class TransacaoService(AppDbContext context)
    {
        private readonly AppDbContext _context = context;

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
