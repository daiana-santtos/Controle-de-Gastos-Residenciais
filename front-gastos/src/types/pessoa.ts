export interface PessoaResponse {
    id: number;
    nome: string;
    idade: number;
}

export interface CriarPessoaRequest {
    nome: string;
    idade: number;
}

export interface PessoaTotal {
    id: number;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface TotaisResponse {
    pessoas: PessoaTotal[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoLiquidoGeral: number;
}