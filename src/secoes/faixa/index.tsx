import { Fragment } from 'react';
import { FAIXA } from '@/conteudo/faixa';
import { Contagem } from '@/oferta/Contagem';
import { SoNaOferta } from '@/oferta/Oferta';
import './estilo.css';

// O "·" vira um separador com respiro, como na captura; o texto continua o mesmo.
const comSeparadores = (texto: string) =>
  texto.split(' · ').map((parte, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="faixa__separador"> · </span>}
      {parte}
    </Fragment>
  ));

function Oferta({ antes, riscado, depois, className }: { antes: string; riscado: string; depois: string; className: string }) {
  return (
    <p className={className}>
      {comSeparadores(antes)} <s>{riscado}</s> {comSeparadores(depois)}
    </p>
  );
}

// Faixa fixa no topo durante a oferta (R-12). O invólucro externo é fixo no topo; tudo o que aparece
// está dentro de [data-oferta] (o primeiro da página, com a contagem longa no desktop: tests/e2e/fim-ao-vivo.spec.ts).
export function FaixaDeUrgencia() {
  return (
    <div className="faixa">
      <SoNaOferta>
        <div className="faixa__barra">
          <Oferta className="faixa__texto faixa__texto--desktop" {...FAIXA.desktop} />
          <Oferta className="faixa__texto faixa__texto--celular" {...FAIXA.celular} />
          <p className="faixa__relogio">
            <span className="faixa__contagem faixa__contagem--celular">
              <Contagem formato="curta" />
            </span>
            <span className="faixa__contagem faixa__contagem--desktop">
              <Contagem formato="longa" />
            </span>
          </p>
        </div>
      </SoNaOferta>
    </div>
  );
}
