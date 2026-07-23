import type { TransacaoResponse, CriarTransacaoRequest } from "../types/transacao";

const API_URL = "http://localhost:5141/api/Transacoes";

/**
 * Busca todas as transações cadastradas na API.
 *
 * @returns Lista de transações cadastradas.
 * @throws Error Caso ocorra uma falha na requisição.
 */
export async function listarTransacoes(): Promise<TransacaoResponse[]> {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ao listar transações: ${mensagemErro}`)
    }
    const dados = await resposta.json();
    return dados;
}

/**
 * Envia uma nova transação para a API.
 *
 * @param dados Dados necessários para criar uma nova transação.
 * @returns Transação criada pela API.
 * @throws Error Caso ocorra uma falha na requisição.
 */
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