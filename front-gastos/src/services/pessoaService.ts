import type { PessoaResponse, CriarPessoaRequest, TotaisResponse } from "../types/pessoa.ts";

/** URL base da API de Pessoas. */
const API_URL = "http://localhost:5141/api/Pessoas"; 

/**
 * Busca todas as pessoas cadastradas na API.
 *
 * @returns Lista de pessoas cadastradas.
 * @throws Error Caso ocorra uma falha na requisição.
 */
export async function listarPessoas(): Promise<PessoaResponse[]> {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ao listar pessoas: ${mensagemErro}`);
    }
    // Converte a resposta da API para o objeto esperado.
    const dados = await resposta.json();
    return dados;
}

/**
 * Envia uma nova pessoa para a API.
 *
 * @param dados Dados necessários para criar uma nova pessoa.
 * @returns Pessoa criada pela API.
 * @throws Error Caso ocorra uma falha na requisição.
 */
export async function criarPessoa(dados: CriarPessoaRequest): Promise<PessoaResponse> {
    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ao criar pessoa: ${mensagemErro}`);
    }
    // Retorna a pessoa criada pela API.
    const pessoaCriada = await resposta.json();
    return pessoaCriada;
}

/**
 * Exclui uma pessoa cadastrada.
 *
 * @param id Identificador da pessoa a ser excluída.
 * @throws Error Caso ocorra uma falha na requisição.
 */
export async function deletarPessoa(id: number): Promise<void> {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ao deletar pessoa: ${mensagemErro}`);
    }
}

/**
 * Busca o resumo financeiro da aplicação.
 *
 * @returns Totais de receitas, despesas e saldo de cada pessoa,
 * além do consolidado geral.
 * @throws Error Caso ocorra uma falha na requisição.
 */
export async function listarTotais(): Promise<TotaisResponse> {
    const resposta = await fetch(`${API_URL}/totais`);
    
    if (!resposta.ok) {
        const mensagemErro = await resposta.text();
        throw new Error(`Erro ao buscar totais: ${mensagemErro}`);
    }

    return await resposta.json();
}