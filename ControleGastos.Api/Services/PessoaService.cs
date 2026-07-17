using ControleGastos.Api.Data;

namespace ControleGastos.Api.Services
{
    public class PessoaService(AppDbContext context)
    {
        private readonly AppDbContext _context = context;
    }
}
