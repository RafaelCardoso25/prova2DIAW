const SELOS = {
  indicado: 'Indicado',
  suspenso: 'Suspenso',
};

function JogadorCard({ jogador, selecionado = false, onSelecionar }) {
  const selo = SELOS[jogador.situacao];
  const classes = `card card-${jogador.situacao} ${selecionado ? 'card-selecionado' : ''}`;

  return (
    <article className={classes}>
      {selo && <span className={`selo selo-${jogador.situacao}`}>{selo}</span>}
      <img src={jogador.foto} alt={jogador.nome} className="card-foto" />
      <div className="card-info">
        <h3>
          <span className="card-numero">{jogador.numero}</span> {jogador.nome}
        </h3>
        <p className="card-posicao">{jogador.posicao}</p>
        {onSelecionar && (
          <button
            type="button"
            className="botao botao-selecionar"
            onClick={() => onSelecionar(jogador)}
          >
            {selecionado ? '✓ Selecionado' : 'Selecionar'}
          </button>
        )}
      </div>
    </article>
  );
}

export default JogadorCard;
