'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react';

// A cena (three, fiber e scroll-rig) só é baixada quando a seção chega perto da tela e o canvas existe.
const CenaEsfera = dynamic(() => import('@/esfera/CenaEsfera').then((m) => m.CenaEsfera), { ssr: false });

// O canvas global só monta no desktop e no celular (CarregarCanvas marca o modo no <html>).
const comCanvas = () => /\bmodo-(desktop|celular)\b/.test(document.documentElement.className);

// O palco da esfera: a esfera parada (children) fica no HTML; com o canvas, a cena desenha por cima e o CSS a esconde.
// "formado": metade do palco na tela, e as partículas correm para o F; saiu, voltam a girar.
export function Palco({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [perto, setPerto] = useState(false);
  const [formado, setFormado] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chegando = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || !comCanvas()) return;
        setPerto(true);
        chegando.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    const naTela = new IntersectionObserver(([e]) => setFormado(e.isIntersecting), { threshold: 0.5 });
    chegando.observe(el);
    naTela.observe(el);
    return () => {
      chegando.disconnect();
      naTela.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={perto ? 'chamada__esfera chamada__esfera--cena' : 'chamada__esfera'}>
      {children}
      {perto && <CenaEsfera track={ref as MutableRefObject<HTMLElement>} formado={formado} />}
    </div>
  );
}
