'use client';

import { useEffect, useState } from 'react';
import { contagemCurta, contagemLonga, estadoDaOferta, FIM_DA_OFERTA, type Restante } from './relogio';

const encerrar = () => {
  document.documentElement.dataset.oferta = 'encerrada';
};

// O instante atual, trocado a cada virada de segundo da contagem (alinhado ao fim, não à montagem). Null até montar:
// sem JavaScript e no HTML gerado não há contagem. No fim, marca a oferta encerrada e para.
function useAgora(): Date | null {
  const [agora, setAgora] = useState<Date | null>(null);
  useEffect(() => {
    let espera = 0;
    const passo = () => {
      const agora = new Date();
      setAgora(agora);
      const falta = FIM_DA_OFERTA.getTime() - agora.getTime();
      if (falta <= 0) return encerrar();
      espera = window.setTimeout(passo, falta % 1000 || 1000);
    };
    passo();
    return () => clearTimeout(espera);
  }, []);
  return agora;
}

// As partes da contagem (caixas do Incluso); null antes de montar e depois do fim.
export function useRestante(): Restante | null {
  const agora = useAgora();
  if (!agora) return null;
  const estado = estadoDaOferta(agora);
  return estado.ativa ? estado.restante : null;
}

export function Contagem({ formato }: { formato: 'curta' | 'longa' }) {
  const agora = useAgora();
  if (!agora || !estadoDaOferta(agora).ativa) return null;
  return <>{formato === 'curta' ? contagemCurta(agora) : contagemLonga(agora)}</>;
}
