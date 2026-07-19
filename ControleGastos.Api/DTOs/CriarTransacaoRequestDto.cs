using ControleGastos.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.DTOs
{
    public class CriarTransacaoRequestDto
    {
        [Required]
        public int PessoaId { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser um número positivo.")]
        public decimal Valor { get; set; }

        [Required]
        [Range(1, 2)]
        public TipoTransacao Tipo { get; set; } //1 = despesa | 2 = receita
        
        [StringLength(200)]
        public string? Descricao { get; set; }
    }
}
