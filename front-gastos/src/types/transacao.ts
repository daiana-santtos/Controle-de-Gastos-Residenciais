export interface TransacaoResponse {
    id: number;
    nomePessoa: string;
    valor: number;
    tipo: number;
    descricao?: string;
}

export interface CriarTransacaoRequest {
    pessoaId: number;
    valor: number;
    tipo: number;
    descricao?: string;
}