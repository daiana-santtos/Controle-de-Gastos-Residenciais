
export interface PessoaResponse {
    id: number;
    nome: string;
    idade: number;
}

export interface CriarPessoaRequest {
    nome: string;
    idade: number;
}