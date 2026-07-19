namespace ControleGastos.Api.DTOs
{
    public class TransacaoResponseDto
    {
        public int Id { get; set; }
        public string NomePessoa { get; set; }
        public decimal Valor { get; set; }
        public int Tipo { get; set; } //1 = despesa | 2 = receita
        public string? Descricao { get; set; }
    }
}
