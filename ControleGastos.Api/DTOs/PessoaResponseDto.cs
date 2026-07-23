namespace ControleGastos.Api.DTOs
{
    public class PessoaResponseDto
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public int Idade { get; set; }
    }
}
