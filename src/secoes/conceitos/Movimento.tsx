'use client';

import { useEffect } from 'react';
import { gsap, PRIORIDADE, recalcularGatilhos, ScrollTrigger } from '@/gsap';
import { LIMITE_CELULAR } from '@/lib/ambiente';

// Desktop com movimento: a parte de cima da seção fica presa abaixo do cabeçalho e a galeria anda na horizontal com a
// rolagem; a capa anda um pouco mais devagar (paralaxe por transform, sem WebGL). Celular, reduzido e sem JavaScript:
// nada disso, a galeria rola para o lado (estilo.css).
export function Movimento() {
  useEffect(() => {
    const secao = document.getElementById('conceitos');
    const presa = secao?.querySelector<HTMLElement>('.conceitos__presa');
    const galeria = secao?.querySelector<HTMLElement>('.conceitos__galeria');
    const trilho = secao?.querySelector<HTMLElement>('.conceitos__trilho');
    if (!secao || !presa || !galeria || !trilho) return;

    const mm = gsap.matchMedia();
    mm.add(`(min-width: ${LIMITE_CELULAR}px) and (prefers-reduced-motion: no-preference)`, () => {
      secao.classList.add('conceitos--presa');
      // O fim da galeria: o último cartão encosta na margem direita.
      const distancia = () => Math.max(0, trilho.scrollWidth - trilho.clientWidth);
      // A faixa e o cabeçalho fixos: o mesmo valor que as âncoras usam (scroll-padding-top).
      const topo = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const andar = gsap.to(trilho, {
        x: () => -distancia(),
        ease: 'none',
        scrollTrigger: {
          trigger: presa,
          start: () => `top ${topo()}`,
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: PRIORIDADE.conceitos,
        },
      });
      for (const capa of trilho.querySelectorAll('.cartao__capa img'))
        gsap.fromTo(capa, { xPercent: -4 }, {
          xPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: capa.parentElement, containerAnimation: andar, start: 'left right', end: 'right left', scrub: true },
        });

      // Pelo teclado: o cartão que recebe o foco é trazido para a tela rolando a página até o ponto dele.
      const aoFocar = (e: FocusEvent) => {
        const li = (e.target as HTMLElement).closest('li');
        const st = andar.scrollTrigger;
        if (!li || !st || !distancia()) return;
        const progresso = Math.min(1, li.offsetLeft / distancia());
        window.scrollTo({ top: st.start + (st.end - st.start) * progresso, behavior: 'instant' });
      };
      trilho.addEventListener('focusin', aoFocar);
      recalcularGatilhos();
      return () => {
        trilho.removeEventListener('focusin', aoFocar);
        secao.classList.remove('conceitos--presa');
      };
    });
    // O pin muda a altura da página: os gatilhos de baixo recalculam depois das capas e das fontes.
    const recalcular = () => recalcularGatilhos();
    window.addEventListener('load', recalcular);
    return () => {
      window.removeEventListener('load', recalcular);
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}
