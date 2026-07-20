import { useEffect, useState } from 'react'
import './App.css'
import type { PessoaResponse } from './types/pessoa'
import { listarPessoas } from './services/pessoaService'

function App() {
  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    async function carregarPessoas() {
      setCarregando(true);

      const dados = await listarPessoas();

      setPessoas(dados);

      setCarregando(false);
    }

    carregarPessoas();
  }, []);

  if (carregando) {
    return <p>Carregando pessoas do banco...</p>;
  }

  return (
    <div>
            <h1>Pessoas</h1>

            <ul>
                {pessoas.map((pessoa) => (
                    <li key={pessoa.id}>
                        {pessoa.id} - {pessoa.nome} - {pessoa.idade} anos
                    </li>
                ))}
            </ul>
        </div>
  )
}
export default App
