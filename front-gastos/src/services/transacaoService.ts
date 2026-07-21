import type { TransacaoResponse, CriarTransacaoRequest } from "../types/transacao.ts";

const API_URL = "http://localhost:5141/api/Transacoes";

export async function listarTransacoes(): Promise<TransacaoResponse[]> {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    return dados;
}

export async function criarTransacao(dados: CriarTransacaoRequest): Promise<TransacaoResponse> {
    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ao criar transação: ${mensagemErro}`);
    }

    return await resposta.json();
}