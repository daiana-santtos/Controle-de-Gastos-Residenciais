import { useState } from "react";
import { deletarPessoa } from "../../services/pessoaService";
import type { PessoaResponse } from "../../types/pessoa";

/** 
 * Propriedades recebidas pelo componente PessoaList. 
 * */
interface PessoaListProps {
    /** Array contendo os dados das pessoas para renderização. */
    pessoas: PessoaResponse[];
    /** Callback acionado após uma exclusão bem-sucedida no banco para recarregar a lista. */
    aoExcluir: () => Promise<void>;
    /** Callback para atualizar das transações (exclusão em cascata). */
    atualizarTransacoes: () => Promise<void>;
    /** Callback para recalcular os saldos no resumo financeiro. */
    atualizarTotais: () => Promise<void>;
    
}

/**
 * Componente responsável por renderizar a listagem de pessoas cadastradas.
 * Gerencia internamente a ação de exclusão, emitindo callbacks para atualizar o estado global da aplicação.
 */
function PessoaList({ pessoas, aoExcluir, atualizarTransacoes, atualizarTotais }: PessoaListProps) {
    const [erro, setErro] = useState<string>("");
    const [sucesso,setSucesso] = useState<string>("");

    /**
     * Exclui uma pessoa após confirmação do usuário.
     * Caso a operação seja concluída com sucesso, atualiza as listas
     * de pessoas, transações e o resumo financeiro.
     *
     * @param {number} id - Identificador da pessoa a ser excluída.
     */
    async function excluir(id:number) {
        const confirmar = window.confirm("Tem certeza que deseja excluir esta pessoa? Todas as transações dela também serão apagadas.");
        if (!confirmar) return;

        try {
            await deletarPessoa(id);
            setErro("");
            setSucesso("Pessoa excluída com sucesso!");
            await aoExcluir();
            await atualizarTransacoes();
            await atualizarTotais();

            setTimeout(() => {
                setSucesso("");
            }, 3000);
        }
        catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            }
            else {
                setErro("Ocorreu um erro inesperado.");
            }

            setTimeout(() => {
                setErro("");
            }, 3000);
        }
    }

    return (
        <div>
            <h2>Pessoas</h2>

            {erro && (<p className="erro">{erro}</p>)}
            {sucesso && (<p className="sucesso">{sucesso}</p>)}

            <ul className="lista">
            {pessoas.map((pessoa) => (
                    <li key={pessoa.id}>
                        {pessoa.id} - {pessoa.nome} - {pessoa.idade} anos
                        <button className="btn-excluir" onClick={() => excluir(pessoa.id)}>Excluir</button>
                    </li> 
            ))}
            </ul>
    
        </div>
    );
}

export default PessoaList;