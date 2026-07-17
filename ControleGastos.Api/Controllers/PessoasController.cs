using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Services;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController(PessoaService service) : ControllerBase
    {
        private readonly PessoaService _service = service;

    }
}
