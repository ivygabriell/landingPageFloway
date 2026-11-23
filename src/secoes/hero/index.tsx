import type { CSSProperties } from 'react';
import { HERO } from '@/conteudo/hero';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { PALAVRA } from '@/marca/palavra';
import { SoNaOferta } from '@/oferta/Oferta';
import { Entrada } from './Entrada';
import './estilo.css';

// Lâminas de vidro: 5 no desktop, 3 no celular (as capturas).
const LAMINAS = 5;
const LAMINAS_NO_CELULAR = 3;
// Cópias da lista de benefícios na trilha que corre (a primeira é a que o leitor de tela lê).
const COPIAS = 16;

function Condicao({ qual }: { qual: 'desktop' | 'celular' }) {
  const { antes, riscado, depois } = HERO.condicao[qual];
  return (
    <SoNaOferta>
      <p className={`hero-condicao hero-condicao-${qual}`}>
        {antes}
        <s>{riscado}</s>
        {depois}
      </p>
    </SoNaOferta>
  );
}

// Uma camada da palavra: o mesmo desenho (o <path> de #hero-floway), em cor e deslocamento dados pelo CSS.
const Camada = () => (
  <svg viewBox={PALAVRA.viewBox.join(' ')} focusable="false">
    <use href="#hero-floway" />
  </svg>
);

// Hero (R-01, R-12). Todo o texto e os botões saem prontos no HTML (o LCP não espera o canvas). A palavra FLOWAY
// com o vidro e o glitch parados é a composição em SVG e CSS (sem WebGL, reduzido e até a cena chegar); com WebGL,
// a cena (Entrada → CenaHero) a desenha no canvas, anima a entrada e esconde esta.
export function Hero() {
  const { titulo } = HERO;
  return (
    <section id="topo" className="hero">
      <p className="hero-selo">
        <span className="hero-ponto" aria-hidden="true" />
        <span>{HERO.numero}</span>{' '}
        <span className="hero-selo-longo">{HERO.selo}</span>{' '}
        <SoNaOferta as="span">
          <span className="hero-pilula">{HERO.pilula}</span> <span className="hero-selo-curto">{HERO.seloCurto}</span>
        </SoNaOferta>
      </p>

      <div className="hero-palavra" aria-hidden="true">
        <div className="hero-quadro">
          <svg className="hero-defs" viewBox={PALAVRA.viewBox.join(' ')} focusable="false">
            <path id="hero-floway" transform={`translate(${PALAVRA.translacao.join(' ')})`} d={PALAVRA.d} />
          </svg>
          <div className="hero-camada hero-camada-azul">
            <Camada />
          </div>
          <div className="hero-camada hero-camada-base">
            <Camada />
          </div>
          <div className="hero-camada hero-fatia hero-fatia-1">
            <Camada />
          </div>
          <div className="hero-camada hero-fatia hero-fatia-2">
            <Camada />
          </div>
          {Array.from({ length: LAMINAS }, (_, i) => (
            <div key={i} className={i < LAMINAS_NO_CELULAR ? 'hero-lamina' : 'hero-lamina hero-lamina-extra'} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="hero-base">
        <h1 className="hero-titulo">
          <span>
            {titulo.antes}
            <em>{titulo.destaque}</em>
            {titulo.depois}
          </span>{' '}
          <span>{titulo.segunda}</span>
        </h1>
        <div className="hero-lado">
          <p className="hero-apoio">{HERO.apoio}</p>
          <Condicao qual="celular" />
          <div className="hero-acoes">
            <a className="hero-botao" href={DESTINO_DO_CONTATO}>
              {HERO.botao} <span aria-hidden="true">→</span>
            </a>
            <a className="hero-link" href="#incluso">
              {HERO.link}
            </a>
            <Condicao qual="desktop" />
          </div>
        </div>
      </div>

      <div className="hero-beneficios">
        <div className="hero-trilho">
          {Array.from({ length: COPIAS }, (_, i) => (
            <ul key={i} aria-hidden={i > 0 || undefined}>
              {HERO.beneficios.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <Entrada />
    </section>
  );
}
