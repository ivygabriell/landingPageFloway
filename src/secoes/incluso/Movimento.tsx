'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/gsap';
import { prefereMenosMovimento } from '@/lib/ambiente';

// O movimento das notas do Incluso: a página escurece ao entrar (um véu claro some com a rolagem), o preço começa
// a tremer (CSS, a cada 6 s) e os ✓ marcam um depois do outro. Sem JavaScript e no reduzido, nada disso: tudo parado e visível.
export function Movimento() {
  const veu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const secao = veu.current?.parentElement;
    if (!secao || prefereMenosMovimento()) return;
    secao.classList.add('incluso--animado');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        veu.current,
        { opacity: 1 },
        { opacity: 0, ease: 'none', scrollTrigger: { trigger: secao, start: 'top bottom', end: 'top 35%', scrub: true } },
      );
      ScrollTrigger.create({ trigger: secao, start: 'top 60%', once: true, onEnter: () => secao.classList.add('incluso--tremendo') });
      for (const item of secao.querySelectorAll('.incluso__lista li'))
        ScrollTrigger.create({ trigger: item, start: 'top 85%', once: true, onEnter: () => item.classList.add('incluso__item--marcado') });
    }, secao);
    return () => {
      ctx.revert();
      secao.classList.remove('incluso--animado', 'incluso--tremendo');
    };
  }, []);

  return <div className="incluso__veu" ref={veu} aria-hidden="true" />;
}
