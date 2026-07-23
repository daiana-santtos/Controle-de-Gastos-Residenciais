import { formatarMoeda } from "../../utils/formatadores";
import type { TransacaoResponse } from "../../types/transacao";

/**
 * Propriedades recebidas pelo componente TransacaoList.
 */
interface TransacaoListProps {
    /** Array contendo as transações cadastradas para renderização. */
    transacoes: TransacaoResponse[];
}

/**
 * Componente responsável por renderizar a listagem de transações cadastradas.
 * Exibe as informações da pessoa, descrição, valor e tipo de cada transação.
 */
function TransacaoList({ transacoes }: TransacaoListProps) {
    return (
        <div>
            <h2>Transações</h2>

            <table>
                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Renderiza uma linha da tabela para cada transação cadastrada. */}
                    {transacoes.map((transacao) => (
                        <tr key={transacao.id}>
                            <td>{transacao.nomePessoa}</td>
                            <td>{transacao.descricao}</td>
                            <td>{formatarMoeda(transacao.valor)}</td>
                            {/* Converte o valor numérico do enum para um texto amigável. */}
                            <td>{transacao.tipo === 1 ? "Despesa" : "Receita"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransacaoList