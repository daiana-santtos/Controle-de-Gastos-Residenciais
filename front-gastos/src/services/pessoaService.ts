import type { PessoaResponse, CriarPessoaRequest } from "../types/pessoa.ts";

const API_URL = "http://localhost:5141/api/Pessoas"; 

export async function listarPessoas(): Promise<PessoaResponse[]> {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    return dados;
}

export async function criarPessoa(dados: CriarPessoaRequest): Promise<PessoaResponse> {
    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });
    const pessoaCriada = await resposta.json();
    return pessoaCriada;
}