import { useState } from "react";
import { criarPessoa } from "../../services/pessoaService";
import type { SubmitEvent } from "react";
import type { CriarPessoaRequest } from "../../types/pessoa";

/**
 * Propriedades esperadas pelo componente PessoaForm.
 */
interface PessoaFormProps {
    /** Callback responsável por recarregar a lista de pessoas após o cadastro. */
    aoSalvar: () => Promise<void>;

    /** Callback responsável por atualizar o resumo financeiro. */
    atualizarTotais: () => Promise<void>
}

/**
 * Componente responsável pelo cadastro de novas pessoas.
 * Realiza a validação dos dados informados, envia a requisição para a API
 * e, em caso de sucesso, solicita a atualização da lista e do resumo.
 */
function PessoaForm({ aoSalvar, atualizarTotais }: PessoaFormProps) {
    const [nome, setNome] = useState<string>("");
    const [idade, setIdade] = useState<number>(0);
    const [erro, setErro] = useState<string>("");
    const [sucesso,setSucesso] = useState<string>("");

    /**
     * Manipula o envio do formulário de cadastro.
     * Valida os dados informados, cria uma nova pessoa por meio da API
     * e atualiza os dados exibidos na interface.
     *
     * @param {SubmitEvent<HTMLFormElement>} e - Evento de submissão do formulário.
     */
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
            await aoSalvar();
            await atualizarTotais();
            //Limpa o formulário
            setNome("");
            setIdade(0);

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
        <form onSubmit={handleSubmit} className="form">
            <h2>Nova Pessoa</h2>

            {erro && (<p className="erro">{erro}</p>)}
            {sucesso && (<p className="sucesso">{sucesso}</p>)}

            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="idade">Idade</label>
                <input
                    type="number"
                    id="idade"
                    value={idade}
                    onChange={(e) => setIdade(Number(e.target.value))}
                />
            </div>
            <button type="submit" className="btn-form">Criar Pessoa</button>
        </form>
    )
}

export default PessoaForm;