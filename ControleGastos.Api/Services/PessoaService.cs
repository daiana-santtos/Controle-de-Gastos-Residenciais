using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class PessoaService(AppDbContext context)
    {
        private readonly AppDbContext _context = context;
        public async Task<PessoaResponseDto> CriarPessoaAsync(CriarPessoaRequestDto dto)
        {
            Pessoa pessoa = new()
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            await _context.Pessoas.AddAsync(pessoa);
            await _context.SaveChangesAsync();

            return new PessoaResponseDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };
        }

        public async Task<List<PessoaResponseDto>> ListarPessoasAsync()
        {
            var pessoas = await _context.Pessoas
                .AsNoTracking()
                .ToListAsync();

            return [.. pessoas.Select(p => new PessoaResponseDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade
            })];
        }

        public async Task<bool> DeletarPessoaAsync(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa == null)
            {
                return false;
            }

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<TotaisResponseDto> ConsultarTotaisAsync()
        {
            var pessoasTotais = await _context.Pessoas
                .AsNoTracking()
                .Select(p => new
                {
                    p.Id,
                    p.Nome,
                    TotalDespesas = p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor),
                    TotalReceitas = p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor)
                })
                .Select(x => new PessoaTotalDto
                {
                    Id = x.Id,
                    Nome = x.Nome,
                    TotalDespesas = x.TotalDespesas,
                    TotalReceitas = x.TotalReceitas,
                    Saldo = x.TotalReceitas - x.TotalDespesas
                })
                .ToListAsync();
            return new TotaisResponseDto
            {
                Pessoas = pessoasTotais,
                TotalGeralDespesas = pessoasTotais.Sum(p => p.TotalDespesas),
                TotalGeralReceitas = pessoasTotais.Sum(p => p.TotalReceitas),
                SaldoLiquidoGeral = pessoasTotais.Sum(p => p.Saldo)
            };
        }
    }
}
