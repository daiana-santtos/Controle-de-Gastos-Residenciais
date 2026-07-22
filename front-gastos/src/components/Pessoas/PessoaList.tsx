import { deletarPessoa } from "../../services/pessoaService";
import type { PessoaResponse } from "../../types/pessoa";

interface PessoaListProps {
    pessoas: PessoaResponse[];
    aoExcluir: () => Promise<void>;
    atualizarTransacoes: () => Promise<void>;
    atualizarTotais: () => Promise<void>;
}

function PessoaList({ pessoas, aoExcluir, atualizarTransacoes, atualizarTotais }: PessoaListProps) {
    async function excluir(id:number) {
        try {
            await deletarPessoa(id);
            await aoExcluir();
            await atualizarTransacoes();
            await atualizarTotais();
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }

    return (
        <div>
            <h2>Pessoas</h2>

            <ul>
            {pessoas.map((pessoa) => (
                    <li key={pessoa.id}>
                        {pessoa.id} - {pessoa.nome} - {pessoa.idade} anos
                        <button onClick={() => excluir(pessoa.id)}>Excluir</button>
                    </li> 
            ))}
            </ul>
    
        </div>
    );
}

export default PessoaList;