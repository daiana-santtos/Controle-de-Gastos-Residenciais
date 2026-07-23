import { formatarMoeda } from "../../utils/formatadores";
import type { TotaisResponse } from "../../types/pessoa";

/**
 * Propriedades recebidas pelo componente Totais.
 */
interface TotaisProps {
    /** Dados consolidados do resumo financeiro da aplicação. */
    totais: TotaisResponse | null;
}

/**
 * Componente responsável por exibir o resumo financeiro da aplicação.
 * Apresenta os totais de receitas, despesas e saldo de cada pessoa,
 * além dos totais gerais do sistema.
 */
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
                    {/* Renderiza uma linha para cada pessoa cadastrada. */}
                    {totais.pessoas.map((pessoa) => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.nome}</td>
                            <td>{formatarMoeda(pessoa.totalReceitas)}</td>
                            <td>{formatarMoeda(pessoa.totalDespesas)}</td>
                            <td>{formatarMoeda(pessoa.saldo)}</td>
                        </tr>
                    ))}
                </tbody>

                {/* Exibe o consolidado geral da aplicação. */}
                <tfoot>
                    <tr>
                        <th>Total Geral</th>
                        <th>{formatarMoeda(totais.totalGeralReceitas)}</th>
                        <th>{formatarMoeda(totais.totalGeralDespesas)}</th>
                        <th>{formatarMoeda(totais.saldoLiquidoGeral)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Totais;
