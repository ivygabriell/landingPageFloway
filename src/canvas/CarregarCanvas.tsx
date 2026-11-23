'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { marcarModo } from '@/lib/webgl';

// O three, o fiber e o scroll-rig só são baixados quando o canvas vai montar: fora do pacote inicial da página.
const CanvasGlobal = dynamic(() => import('./CanvasGlobal').then((m) => m.CanvasGlobal), { ssr: false });

// Marca o modo da página ao montar (depois da primeira pintura) e só carrega o canvas no desktop e no celular:
// sem WebGL e com movimento reduzido, a página usa as versões em CSS e SVG.
export function CarregarCanvas() {
  const [montar, setMontar] = useState(false);

  useEffect(() => {
    const modo = marcarModo();
    if (modo === 'sem-webgl') document.documentElement.classList.add('js-global-canvas-error');
    setMontar(modo === 'desktop' || modo === 'celular');
  }, []);

  return montar ? <CanvasGlobal /> : null;
}
