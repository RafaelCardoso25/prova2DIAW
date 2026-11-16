import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularResultado,
  desfazerUltimoVoto,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = votos.length;
  const resultado = calcularResultado(votos);
  const primeiro = resultado[0];
  const segundo = resultado[1];
  const vantagem = primeiro.votos - segundo.votos;

  function handleDesfazer() {
    setVotos(desfazerUltimoVoto());
  }

  function handleZerar() {
    if (window.confirm('Tem certeza de que deseja zerar a votação?')) {
      zerarVotos();
      setVotos([]);
    }
  }

  return (
    <main className="pagina">
      <h1>Parcial: Craque do Jogo</h1>
      <p className="total-votos">
        <strong>{total}</strong> {total === 1 ? 'voto computado' : 'votos computados'}
      </p>

      {total === 0 ? (
        <div className="sem-votos">
          <p>Nenhum voto ainda. Escolha o craque do jogo para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">Ir para a votação</Link>
        </div>
      ) : (
        <>
          <p className="disputa">
            {vantagem === 0
              ? `Empate na liderança entre ${primeiro.nome} e ${segundo.nome}!`
              : `${primeiro.nome} lidera com ${vantagem} ${vantagem === 1 ? 'voto' : 'votos'} de vantagem sobre ${segundo.nome}.`}
          </p>

          <ol className="placar">
            {resultado.map((j, indice) => (
              <li
                key={j.id}
                className={`placar-item ${indice === 0 ? 'placar-craque' : ''} ${indice === 1 ? 'placar-vice' : ''}`}
              >
                <span className="placar-posicao">{indice + 1}º</span>
                <img src={j.foto} alt={j.nome} className="placar-foto" />
                <div className="placar-dados">
                  <h3>
                    {j.nome}
                    {indice === 0 && <span className="placar-selo">Craque do jogo</span>}
                    {indice === 1 && <span className="placar-selo">Vice</span>}
                  </h3>
                  <div className="barra">
                    <div className="barra-preenchida" style={{ width: `${j.percentual}%` }} />
                  </div>
                  <p className="placar-numeros">
                    {j.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({j.votos}{' '}
                    {j.votos === 1 ? 'voto' : 'votos'})
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="resultado-acoes">
            <button type="button" className="botao botao-claro" onClick={handleDesfazer}>
              Desfazer último voto
            </button>
            <button type="button" className="botao botao-contorno" onClick={handleZerar}>
              Zerar votação
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Resultado;
