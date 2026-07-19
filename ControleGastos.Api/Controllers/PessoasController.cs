using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Services;
using ControleGastos.Api.DTOs;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController(PessoaService service) : ControllerBase
    {
        private readonly PessoaService _service = service;
        [HttpPost]
        public async Task<IActionResult> CriarPessoa(CriarPessoaRequestDto dto)
        {
            var pessoa = await _service.CriarPessoaAsync(dto);
            return CreatedAtAction(nameof(CriarPessoa), new { id = pessoa.Id }, pessoa);
        }

        [HttpGet]
        public async Task<IActionResult> ListarPessoas()
        {
            var pessoas = await _service.ListarPessoasAsync();
            return Ok(pessoas);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarPessoa(int id)
        {
            bool removido = await _service.DeletarPessoaAsync(id);

            if (!removido)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("totais")]
        public async Task<IActionResult> ConsultarTotais()
        {
            var resultado = await _service.ConsultarTotaisAsync();

            return Ok(resultado);
        }
    }
}
