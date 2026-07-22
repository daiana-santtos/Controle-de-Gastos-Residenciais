import { useState } from 'react';
import { criarTransacao } from '../../services/transacaoService';
import type { SubmitEvent } from 'react';
import type { PessoaResponse } from '../../types/pessoa';
import type { CriarTransacaoRequest } from '../../types/transacao';


interface TransacaoFormProps {
    pessoas: PessoaResponse[],
    aoSalvar: () => Promise<void>;
    atualizarTotais: () => Promise<void>;
}

function TransacaoForm( { pessoas, aoSalvar, atualizarTotais }: TransacaoFormProps) {
    const [pessoaId, setPessoaId] = useState<number>(0);
    const [valor, setValor] = useState<number>(0);
    const [tipo, setTipo] = useState<number>(1); // 1 = Despesa, 2 = Receita
    const [descricao, setDescricao] = useState<string>("");
    const [erro, setErro] = useState<string>("");
    const [sucesso, setSucesso] = useState<string>("");

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); 
        if (pessoaId === 0 || valor <= 0) {
            setErro("Preencha todos os campos corretamente.");
            return;
        }

        const dados: CriarTransacaoRequest = {
            pessoaId,
            valor,
            tipo,
            descricao
        };

        try {
            await criarTransacao(dados);
            setErro("");
            setSucesso("Transação criada com sucesso!");
            await aoSalvar();
            await atualizarTotais();
            //Limpa o formulário
            setDescricao("");
            setValor(0);
            setTipo(1);
            setPessoaId(0);
        }
        catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            }
            else {
                setErro("Ocorreu um erro inesperado.");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Nova Transação</h2>

            {erro && (<p className="erro">{erro}</p>)}
            {sucesso && (<p style={{ color: 'green', fontWeight: 'bold' }}>{sucesso}</p>)}

            <div>
                <label>Pessoa</label>

                <select value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))}>
                    <option value={0}>Selecione uma pessoa</option>
                    {pessoas.map((pessoa) => (<option key={pessoa.id} value={pessoa.id}> {pessoa.nome} </option>))}
                </select>
            </div>
            
            <div>
                <label>Descrição</label>

                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>

            <div>
                <label>Valor</label>
                <input type="number" value={valor} onChange={(e) => setValor(Number(e.target.value))} />
            </div>

            <div>
                <label>Tipo</label>
                <select value={tipo} onChange={(e) => setTipo(Number(e.target.value))}>
                    <option value={1}>Despesa</option>
                    <option value={2}>Receita</option>
                </select>
            </div>

            <button type="submit">Criar Transação</button>
        </form>
    );
}

export default TransacaoForm;