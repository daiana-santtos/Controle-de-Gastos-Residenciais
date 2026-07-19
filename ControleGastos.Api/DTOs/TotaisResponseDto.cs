namespace ControleGastos.Api.DTOs
{
    public class TotaisResponseDto
    {
        public List<PessoaTotalDto> Pessoas { get; set; } = [];
        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }
        public decimal SaldoLiquidoGeral { get; set; }
    }
}
