import { CHAMADA_FINAL } from '@/conteudo/chamada-final';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { Contagem } from '@/oferta/Contagem';
import { SoNaOferta } from '@/oferta/Oferta';
import { EsferaParada } from './EsferaParada';
import { Palco } from './Palco';
import { Rodape } from './Rodape';
import './estilo.css';

const { titulo, condicao } = CHAMADA_FINAL;

// Chamada final (R-10, R-12): a esfera que forma o F, o título, a condição e a contagem (só na oferta), o botão
// e o rodapé. Depois do fim, o título fica "Seu site novo." e somem a condição e a contagem.
export function ChamadaFinal() {
  return (
    <>
      <section id="comecar" className="chamada">
        <Palco>
          <EsferaParada />
        </Palco>
        <div className="chamada__texto">
          <p className="chamada__selo">
            <span className="chamada__ponto" aria-hidden="true" />
            <span className="chamada__numero">{CHAMADA_FINAL.numero}</span>{' '}
            <span className="chamada__selo-texto">{CHAMADA_FINAL.selo}</span>
          </p>
          <h2 className="chamada__titulo">
            <span className="chamada__linha">
              {titulo.antes} <em>{titulo.enfase}</em>
              {titulo.depois}
            </span>{' '}
            <SoNaOferta as="span">
              {titulo.oferta.map((linha, i) => (
                <span key={i} className="chamada__linha">
                  {i > 0 && ' '}
                  {linha}
                </span>
              ))}
            </SoNaOferta>
          </h2>
          <SoNaOferta>
            <p className="chamada__condicao">
              {condicao.antes} <s>{condicao.riscado}</s> {condicao.depois}
            </p>
            <p className="chamada__relogio">
              <span className="chamada__rotulo">{CHAMADA_FINAL.rotuloDaContagem}</span>{' '}
              <span className="chamada__contagem">
                <Contagem formato="longa" />
              </span>
            </p>
          </SoNaOferta>
          <a className="chamada__botao" href={DESTINO_DO_CONTATO}>
            {CHAMADA_FINAL.botao} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <Rodape />
    </>
  );
}
