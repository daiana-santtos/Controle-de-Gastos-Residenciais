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

export async function deletarPessoa(id: number): Promise<void> {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!resposta.ok) throw new Error("Erro ao deletar pessoa.");
}

export async function listarTotais(): Promise<any> {
    const resposta = await fetch(`${API_URL}/totais`);
    
    if (!resposta.ok){
        throw new Error("Erro ao buscar os totais.")
    }

    return await resposta.json();
}