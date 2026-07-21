import { useEffect, useState } from 'react'
import './App.css'
import type { PessoaResponse } from './types/pessoa'
import { listarPessoas } from './services/pessoaService'
import TransacaoForm from './components/Transacoes/TransacaoForm'
import PessoaForm from './components/Pessoas/PessoaForm'
import PessoaList from './components/Pessoas/PessoaList'
import type { TransacaoResponse } from './types/transacao'
import { listarTransacoes } from './services/transacaoService'
import TransacaoList from './components/Transacoes/TransacaoList'

function App() {
  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);

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
  
  useEffect(() => {
    carregarPessoas();
    carregarTransacoes();
  }, []);

  if (carregando) {
    return <p>Carregando pessoas do banco...</p>;
  }

  return (
    <div>
      <h1>Controle de Gastos</h1>

      <PessoaForm aoSalvar={carregarPessoas}/>
      <PessoaList 
        pessoas={pessoas}
        aoExcluir={carregarPessoas}
        atualizarTransacoes={carregarTransacoes}
      />

      <TransacaoForm aoSalvar={carregarTransacoes}/>
      <TransacaoList transacoes={transacoes}/>
    </div>
  )
}
export default App
