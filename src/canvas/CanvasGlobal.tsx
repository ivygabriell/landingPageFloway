'use client';

import { GlobalCanvas } from '@14islands/r3f-scroll-rig';
import { Suspense, useEffect, useState } from 'react';
import { dprMaximo } from '@/lib/ambiente';
import { marcarModo } from '@/lib/webgl';

// Copiado do site oficial (sitesFlowway, componentes/canvas). Um único canvas WebGL atrás de todo o DOM; cada seção
// envia a própria cena com <UseCanvas>. Monta depois da primeira pintura (efeito), e só com WebGL e sem movimento
// reduzido: nos outros modos a página usa as versões em CSS e SVG. Os eventos do ponteiro vêm do <body>.
export function CanvasGlobal() {
  const [montar, setMontar] = useState(false);

  useEffect(() => {
    const modo = marcarModo();
    if (modo === 'sem-webgl') document.documentElement.classList.add('js-global-canvas-error');
    setMontar(modo === 'desktop' || modo === 'celular');
  }, []);

  if (!montar) return null;
  return (
    <GlobalCanvas
      flat
      style={{ zIndex: -1 }}
      dpr={[1, dprMaximo(window.innerWidth)]}
      gl={{ antialias: true, failIfMajorPerformanceCaveat: false }}
      camera={{ near: 0.01, far: 10000, position: [0, 0, 600] }}
      eventSource={document.body}
      eventPrefix="client"
    >
      {(filhos) => <Suspense fallback={null}>{filhos}</Suspense>}
    </GlobalCanvas>
  );
}
