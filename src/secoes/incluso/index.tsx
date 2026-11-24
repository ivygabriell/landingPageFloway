import type { CSSProperties } from 'react';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { INCLUSO } from '@/conteudo/incluso';
import { SoNaOferta } from '@/oferta/Oferta';
import { Caixas } from './Caixas';
import { Movimento } from './Movimento';
import { Preco } from './Preco';
import './estilo.css';

// O único trecho escuro da página e o bloco de venda da oferta (R-05, R-12). As partes da oferta são montadas aqui,
// no servidor; depois do fim somem o selo, o preço, a contagem, o botão e a condição, e o título e a lista ficam cortados.
export function Incluso() {
  const { titulo, lista } = INCLUSO;
  return (
    <section id="incluso" className="incluso">
      <Movimento />
      <p className="incluso__selo">
        <span className="incluso__ponto" aria-hidden="true" />
        {INCLUSO.numero} <span className="incluso__selo-texto">{INCLUSO.selo}</span>
      </p>

      <div className="incluso__oferta">
        <SoNaOferta>
          <p className="incluso__black-friday">{INCLUSO.blackFriday}</p>
          <Preco />
        </SoNaOferta>
        <h2 className="incluso__titulo">
          {titulo.antes}
          <em>{titulo.enfase}</em>
          {titulo.depois}
          <SoNaOferta as="span"> {titulo.oferta}</SoNaOferta>
        </h2>
        <p className="incluso__apoio">{INCLUSO.apoio}</p>
      </div>

      <div className="incluso__compra">
        <SoNaOferta>
          <div className="incluso__contagem">
            <p className="incluso__rotulo">{INCLUSO.rotuloDaContagem}</p>
            <Caixas />
          </div>
        </SoNaOferta>
        <div>
          <p className="incluso__lista-titulo">
          {lista.titulo}
            <SoNaOferta as="span">{lista.oferta}</SoNaOferta>
          </p>
          <ul className="incluso__lista">
            {INCLUSO.itens.map((item, i) => (
              // O ✓ é um ::before (estilo.css): decoração, fora do texto do item.
              <li key={item} style={{ '--i': i } as CSSProperties}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <SoNaOferta>
          <a className="incluso__botao" href={DESTINO_DO_CONTATO}>
            {INCLUSO.botao} <span className="incluso__seta" aria-hidden="true">→</span>
          </a>
          <p className="incluso__condicao">{INCLUSO.condicao}</p>
        </SoNaOferta>
      </div>
    </section>
  );
}
