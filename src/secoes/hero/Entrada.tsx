'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { marcarModo } from '@/lib/webgl';

// A cena WebGL (three, fiber e scroll-rig) só é baixada quando vai montar: fora do pacote inicial (regra do Architect).
const CenaHero = dynamic(() => import('./CenaHero').then((m) => m.CenaHero), { ssr: false });

// Se a cena não marcar a entrada pronta até aqui (ms depois de montar), a composição em SVG, que já está na tela
// parada, é o estado final: a entrada termina em até 2 s também quando a cena demora (R-01).
const LIMITE_DA_ENTRADA = 1600;

// Sem WebGL e no reduzido, a palavra em SVG já está no repouso: a entrada termina ao montar. No desktop e no celular,
// a cena anima a entrada e marca <section data-entrada="pronta">. O texto e os botões nunca esperam por ela.
export function Entrada() {
  const [cena, setCena] = useState(false);

  useEffect(() => {
    const pronta = () => {
      const secao = document.getElementById('topo');
      if (secao) secao.dataset.entrada = 'pronta';
    };
    const modo = marcarModo();
    if (modo !== 'desktop' && modo !== 'celular') return pronta();
    setCena(true);
    const limite = window.setTimeout(pronta, LIMITE_DA_ENTRADA);
    return () => clearTimeout(limite);
  }, []);

  return cena ? <CenaHero /> : null;
}
