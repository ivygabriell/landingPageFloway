'use client';

import { INCLUSO } from '@/conteudo/incluso';
import { useRestante } from '@/oferta/Contagem';

const doisDigitos = (n: number) => String(n).padStart(2, '0');

// As quatro caixas da contagem (R-12). Antes de montar (e sem JavaScript) mostram "--": a data está na condição.
// Sem aria-live: o leitor de tela não anuncia cada segundo.
export function Caixas() {
  const restante = useRestante();
  const valores = restante ? [restante.dias, restante.horas, restante.minutos, restante.segundos] : [];
  return (
    <ol className="incluso__caixas">
      {INCLUSO.caixas.map((rotulo, i) => (
        <li className="incluso__caixa" key={rotulo}>
          <span className="incluso__numero">{valores.length ? doisDigitos(valores[i]) : '--'}</span>{' '}
          <span className="incluso__unidade">{rotulo}</span>
        </li>
      ))}
    </ol>
  );
}
