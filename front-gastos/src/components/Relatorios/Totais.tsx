import type { TotaisResponse } from "../../types/pessoa";

interface TotaisProps {
    totais: TotaisResponse | null;
}

function Totais({totais}: TotaisProps) {
    if (!totais) {
        return <p>Carregando totais...</p>
    }

    return (
        <div>
            <h2>Resumo Financeiro</h2>

            <table>
                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Total Receitas</th>
                        <th>Total Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>

                <tbody>
                    {totais.pessoas.map((pessoa) => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.nome}</td>
                            <td>R$ {pessoa.totalReceitas.toFixed(2)}</td>
                            <td>R$ {pessoa.totalDespesas.toFixed(2)}</td>
                            <td>R$ {pessoa.saldo.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <th>Total Geral</th>
                        <th>R$ {totais.totalGeralReceitas.toFixed(2)}</th>
                        <th>R$ {totais.totalGeralDespesas.toFixed(2)}</th>
                        <th>R$ {totais.saldoLiquidoGeral.toFixed(2)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Totais;
