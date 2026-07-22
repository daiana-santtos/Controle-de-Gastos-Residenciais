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

function App() {
  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [totais, setTotais] = useState<TotaisResponse | null>(null);

  async function carregarPessoas() {
    setCarregando(true);

    const dados = await listarPessoas();

    setPessoas(dados);
    setCarregando(false);
  }

  async function carregarTransacoes() {
    const dados = await listarTransacoes();
    setTransacoes(dados);
  }

  async function carregarTotais() {
    try {
      const dados = await listarTotais();
      setTotais(dados);
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  
  useEffect(() => {
    carregarPessoas();
    carregarTransacoes();
    carregarTotais();
  }, []);

  if (carregando) {
    return <p>Carregando pessoas do banco...</p>;
  }

  return (
    <div>
      <h1>Controle de Gastos</h1>

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

      <TransacaoForm 
        pessoas={pessoas}
        aoSalvar={carregarTransacoes}
        atualizarTotais={carregarTotais}
      />
      <TransacaoList transacoes={transacoes}/>

      <Totais totais={totais} />
    </div>
  )
}
export default App
