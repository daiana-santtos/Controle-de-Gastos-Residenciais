import type { TransacaoResponse } from "../../types/transacao";

interface TransacaoListProps {
    transacoes: TransacaoResponse[];
}

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
                    {transacoes.map((transacao) => (
                        <tr key={transacao.id}>
                            <td>{transacao.nomePessoa}</td>
                            <td>{transacao.descricao}</td>
                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao.valor)}</td>
                            <td>{transacao.tipo === 1 ? "Despesa" : "Receita"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransacaoList