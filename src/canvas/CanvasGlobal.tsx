'use client';

import { GlobalCanvas } from '@14islands/r3f-scroll-rig';
import { Suspense } from 'react';
import { dprMaximo } from '@/lib/ambiente';

// Copiado do site oficial (sitesFlowway, componentes/canvas). Um único canvas WebGL atrás de todo o DOM; cada seção
// envia a própria cena com <UseCanvas>. Quem decide se monta (e baixa este módulo) é o CarregarCanvas, só com WebGL e
// sem movimento reduzido. Os eventos do ponteiro vêm do <body>, porque o canvas fica atrás do conteúdo.
export function CanvasGlobal() {
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
