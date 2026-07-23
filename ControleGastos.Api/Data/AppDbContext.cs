using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;


namespace ControleGastos.Api.Data
{
    /// <summary>
    /// Contexto de acesso ao banco de dados da aplicação.
    /// Responsável por mapear as entidades e configurar seus relacionamentos.
    /// </summary>
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options) 
    {
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura o relacionamento de um para muitos entre Pessoa e Transação.
            // Ao excluir
            modelBuilder.Entity<Pessoa>()
                .HasMany(p => p.Transacoes)
                .WithOne(t => t.Pessoa)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
