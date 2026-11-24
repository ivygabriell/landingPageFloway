import { CONCEITOS, TEXTO_DOS_CONCEITOS as T } from '@/conteudo/conceitos';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { Cartao } from './Cartao';
import { Movimento } from './Movimento';
import './estilo.css';

// A prova (R-06): os cinco conceitos numa galeria horizontal. No celular e no reduzido, rolagem para o lado comum
// (com encaixe no celular); no desktop com movimento, a parte de cima fica presa e a galeria anda com a rolagem (Movimento.tsx).
export function Conceitos() {
  return (
    <section id="conceitos" className="conceitos">
      <div className="conceitos__presa">
        <div className="conceitos__topo">
          <p className="conceitos__selo">
            <span className="conceitos__ponto" aria-hidden="true" />
            {T.numero} <span className="conceitos__selo-texto">{T.selo}</span>
          </p>
          <h2 className="conceitos__titulo">
            {T.titulo.antes}
            <em>{T.titulo.enfase}</em>
            {T.titulo.depois}
          </h2>
          <p className="conceitos__apoio">{T.apoio}</p>
        </div>
        <div className="conceitos__galeria">
          <ul className="conceitos__trilho">
            {CONCEITOS.map((c) => (
              <li key={c.slug}>
                <Cartao {...c} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a className="conceitos__botao" href={DESTINO_DO_CONTATO}>
        {T.botao} <span className="conceitos__seta" aria-hidden="true">→</span>
      </a>
      <Movimento />
    </section>
  );
}
