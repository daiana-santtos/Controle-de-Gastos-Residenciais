using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.DTOs
{
    public class CriarPessoaRequestDto
    {
        [Required]
        public string Nome { get; set; }

        [Range(0, 150)]
        public int Idade { get; set; }
    }
}
