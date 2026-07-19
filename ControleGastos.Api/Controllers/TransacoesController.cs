using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Services;
using ControleGastos.Api.DTOs;


namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController(TransacaoService service) : ControllerBase
    {
        private readonly TransacaoService _service = service;

        [HttpPost]
        public async Task<IActionResult> Criar(CriarTransacaoRequestDto dto)
        {
            try
            {
                var transacao = await _service.CriarTransacaoAsync(dto);

                return CreatedAtAction(nameof(Criar), new { id = transacao.Id }, transacao);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var transacoes = await _service.ListarTransacoesAsync();

            return Ok(transacoes);
        }
    }
}
