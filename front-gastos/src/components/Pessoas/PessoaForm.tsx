import { useState } from "react";
import type { SubmitEvent } from "react";
import type { CriarPessoaRequest } from "../../types/pessoa";
import { criarPessoa } from "../../services/pessoaService";

function PessoaForm({ aoSalvar }: { aoSalvar: () => void }) {
    const [nome, setNome] = useState<string>("");
    const [idade, setIdade] = useState<number>(0);
    const [erro, setErro] = useState<string>("");
    const [sucesso,setSucesso] = useState<string>("");

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (nome.trim() === "" || idade <= 0) {
            setErro("Preencha todos os campos corretamente.");
            return;
        }

        const dados: CriarPessoaRequest = {
            nome,
            idade
        }

        try {
            await criarPessoa(dados);
            setErro("");
            setSucesso("Pessoa criada com sucesso!");
            aoSalvar();
            // Limpa o formulário
            setNome("");
            setIdade(0);
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
            <h2>Nova Pessoa</h2>

            {erro && (<p className="erro">{erro}</p>)}
            {sucesso && (<p style={{ color: 'green', fontWeight: 'bold' }}>{sucesso}</p>)}

            <div>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="idade">Idade:</label>
                <input
                    type="number"
                    id="idade"
                    value={idade}
                    onChange={(e) => setIdade(Number(e.target.value))}
                />
            </div>
            <button type="submit">Criar Pessoa</button>
        </form>
    )
}

export default PessoaForm;