import './App.css'
import { useEffect, useState } from 'react'
import TransacaoForm from './components/Transacoes/TransacaoForm'
import PessoaForm from './components/Pessoas/PessoaForm'
import PessoaList from './components/Pessoas/PessoaList'
import TransacaoList from './components/Transacoes/TransacaoList'
import Totais from './components/Relatorios/Totais'
import { listarPessoas, listarTotais } from './services/pessoaService'
import { listarTransacoes } from './services/transacaoService'
import type { TransacaoResponse } from './types/transacao'
import type { TotaisResponse, PessoaResponse } from './types/pessoa'

/**
 * Componente principal da aplicação.
 * Responsável por gerenciar o estado global, carregar os dados da API,
 * controlar a navegação entre as abas e distribuir os dados para os
 * componentes filhos.
 */
function App() {
  /** Lista de pessoas cadastradas. */
  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  /** Indica se os dados iniciais ainda estão sendo carregados. */
  const [carregando, setCarregando] = useState<boolean>(true);
  /** Lista de transações cadastradas. */
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  /** Resumo financeiro retornado pela API. */
  const [totais, setTotais] = useState<TotaisResponse | null>(null);
  /** Controla qual aba está sendo exibida na interface. */
  const [abaAtiva, setAbaAtiva] = useState<'pessoas' | 'transacoes' | 'totais'>('pessoas');

  /**
 * Recarrega a lista de pessoas a partir da API.
 * Utilizada após operações de cadastro ou exclusão.
 */
  async function carregarPessoas() {
    try {
      const dados = await listarPessoas();
      setPessoas(dados);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Falha ao recarregar pessoas:", error.message);
      }
    }
  }

  /**
 * Recarrega a lista de transações cadastradas.
 * Utilizada após o cadastro ou exclusão em cascata.
 */
  async function carregarTransacoes() {
    try {
      const dados = await listarTransacoes();
      setTransacoes(dados);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Falha ao recarregar transações:", error.message);
      }
    }
  }

  /**
 * Atualiza o resumo financeiro exibido na aplicação.
 */
  async function carregarTotais() {
    try {
      const dados = await listarTotais();
      setTotais(dados);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Falha ao recarregar totais:", error.message);
      }
    }
  }

  /**
 * Carrega todos os dados necessários para inicializar o dashboard.
 * As requisições são executadas em paralelo utilizando Promise.all
 * para reduzir o tempo total de carregamento da aplicação.
 */
  async function inicializarDashboard() {
    try {
      const [pessoas, transacoes, totais] = await Promise.all([
        listarPessoas(),
        listarTransacoes(),
        listarTotais(),
      ]);

      setPessoas(pessoas);
      setTransacoes(transacoes);
      setTotais(totais);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setCarregando(false);
    }
  }

  
  useEffect(() => {
    inicializarDashboard();
  }, []);

  if (carregando) {
    return <p>Carregando pessoas do banco...</p>;
  }

  return (
    <div>
      <h1 className="title">Controle de Gastos</h1>

      {/* Menu de navegação entre os módulos da aplicação. */}
      <nav className="menu-nav">
        <button className="btn-nav" aria-selected={abaAtiva === "pessoas"} onClick={() => setAbaAtiva("pessoas")}>
          👥 Pessoas
        </button>

        <button className="btn-nav" aria-selected={abaAtiva === "transacoes"} onClick={() => setAbaAtiva("transacoes")}>💸 Transações</button>

        <button className="btn-nav" aria-selected={abaAtiva === "totais"} onClick={() => setAbaAtiva("totais")}>📊 Resumo Financeiro</button>
      </nav>

      {/* Área principal onde o conteúdo é renderizado conforme a aba selecionada. */}
      <main className="container">
        {abaAtiva === 'pessoas' && (
          <section className='modulo-container pessoa-container'>
            <PessoaForm 
              aoSalvar={carregarPessoas}
              atualizarTotais={carregarTotais}
            />
            <PessoaList 
              pessoas={pessoas}
              aoExcluir={carregarPessoas}
              atualizarTransacoes={carregarTransacoes}
              atualizarTotais={carregarTotais}
            />
          </section>
        )}

        {abaAtiva === 'transacoes' && (
          <section className='modulo-container'>
            <TransacaoForm 
              pessoas={pessoas}
              aoSalvar={carregarTransacoes}
              atualizarTotais={carregarTotais}
            />
            <TransacaoList transacoes={transacoes}/>
          </section>
        )}

        {abaAtiva === 'totais' && (
          <section className='modulo-container'>
            <Totais totais={totais} />
          </section>
          
        )}
      </main>
    </div>
  )
}
export default App
