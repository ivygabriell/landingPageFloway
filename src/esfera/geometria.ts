import type { AlvoDaEsfera } from '@/marca/amostrar';

// Sem three aqui: a seção usa estes pontos no servidor para a esfera parada em SVG (reduzido e sem WebGL).

// Partículas da cena: menos no celular (desempenho no celular, skill desempenho-na-tela).
export const QUANTIDADE = { desktop: 2400, celular: 1400 } as const;

// O F ocupa 1,15 raio de largura (o alvo de amostrar.ts tem 2,3): como na captura, ele cabe dentro da esfera.
export const ESCALA_DO_F = 0.5;

// O palco tem 2,26 raios de lado (a esfera da captura, com folga para o empurrão do cursor).
export const VISTA = 2.26;

// Fração das partículas que corre para o F; as outras continuam girando na esfera, em volta dele (captura).
export const FRACAO_NO_F = 0.85;

// Fração das partículas da esfera que são azuis (design-system.md: partículas cor.preto e cor.azul).
export const FRACAO_AZUL = 0.08;

// n pontos numa esfera de raio `raio`, pela espiral de Fibonacci (3n valores).
export function pontosDaEsfera(n: number, raio: number): Float32Array {
  const p = new Float32Array(3 * n);
  const angulo = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? 0 : 1 - (2 * i) / (n - 1);
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = angulo * i;
    p[3 * i] = Math.cos(t) * r * raio;
    p[3 * i + 1] = y * raio;
    p[3 * i + 2] = Math.sin(t) * r * raio;
  }
  return p;
}

export type AtributosDaEsfera = {
  aEsfera: Float32Array;
  aAlvo: Float32Array;
  aNoF: Float32Array;
  aAzul: Float32Array;
  aTom: Float32Array;
  aTamanho: Float32Array;
};

// Os atributos de cada partícula: a posição na esfera e no F, se corre para o F, a cor, a opacidade (~0,25 a ~0,9)
// e o tamanho em px de tela.
export function atributosDaEsfera(n: number, alvo: AlvoDaEsfera, aleatorio: () => number): AtributosDaEsfera {
  const aAlvo = new Float32Array(3 * n);
  const aNoF = new Float32Array(n);
  const aAzul = new Float32Array(n);
  const aTom = new Float32Array(n);
  const aTamanho = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < 3; k++) aAlvo[3 * i + k] = alvo.posicoes[3 * i + k] * ESCALA_DO_F;
    const noF = aleatorio() < FRACAO_NO_F;
    aNoF[i] = noF ? 1 : 0;
    aAzul[i] = aleatorio() < FRACAO_AZUL ? 1 : 0;
    aTom[i] = 0.25 + aleatorio() * 0.65;
    // As do F maiores, para o F ficar cheio como na captura.
    aTamanho[i] = noF ? 4 + aleatorio() * 2 : 2.5 + aleatorio() * 2.5;
  }
  return { aEsfera: pontosDaEsfera(n, 1), aAlvo, aNoF, aAzul, aTom, aTamanho };
}
