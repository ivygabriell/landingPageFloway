'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { marcarModo } from '@/lib/webgl';
import { temWebglAcelerado } from './aceleracao';

// A cena WebGL (three, fiber e scroll-rig) só é baixada quando vai montar: fora do pacote inicial (regra do Architect).
const CenaHero = dynamic(() => import('./CenaHero').then((m) => m.CenaHero), { ssr: false });

// Se a cena não marcar a entrada pronta até este instante da carga (ms desde o início da navegação, não da montagem:
// num aparelho lento a montagem já chega tarde), a composição em SVG, parada na tela, é o estado final. Assim a entrada
// termina em até 2 s também quando a cena demora (R-01); a cena que chega depois entra direto no repouso.
const PRAZO_DA_ENTRADA = 1700;

// Sem WebGL (ou só com WebGL por software) e no reduzido, a palavra em SVG já está no repouso: a entrada termina ao
// montar. No desktop e no celular, a cena anima a entrada e marca <section data-entrada="pronta">. O texto e os botões
// nunca esperam por ela.
export function Entrada() {
  const [cena, setCena] = useState(false);

  useEffect(() => {
    const pronta = () => {
      const secao = document.getElementById('topo');
      if (secao) secao.dataset.entrada = 'pronta';
    };
    const modo = marcarModo();
    if ((modo !== 'desktop' && modo !== 'celular') || !temWebglAcelerado()) return pronta();
    setCena(true);
    const limite = window.setTimeout(pronta, Math.max(0, PRAZO_DA_ENTRADA - performance.now()));
    return () => clearTimeout(limite);
  }, []);

  return cena ? <CenaHero /> : null;
}
