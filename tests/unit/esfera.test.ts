import { achatar, alvoDoSimbolo, dentro } from '@/marca/amostrar';
import { SIMBOLO } from '@/marca/simbolo';
import { pontosDaEsfera } from '@/esfera/geometria';

test('pontosDaEsfera(500, 1): 1500 números, todo ponto a 1 ± 0,001 do centro', () => {
  const p = pontosDaEsfera(500, 1);
  expect(p).toBeInstanceOf(Float32Array);
  expect(p).toHaveLength(1500);
  for (let i = 0; i < 500; i++) {
    expect(Math.hypot(p[3 * i], p[3 * i + 1], p[3 * i + 2])).toBeCloseTo(1, 3);
  }
});

test('pontosDaEsfera respeita o raio', () => {
  const p = pontosDaEsfera(50, 2.5);
  for (let i = 0; i < 50; i++) expect(Math.hypot(p[3 * i], p[3 * i + 1], p[3 * i + 2])).toBeCloseTo(2.5, 3);
});

// O jsdom não tem Path2D: o oráculo é o dentro() de amostrar.ts, nas coordenadas do SVG (viewBox 0 0 730 512).
test('os 500 pontos de alvoDoSimbolo(500) caem dentro do símbolo', () => {
  const caminhos = [SIMBOLO.lamina, SIMBOLO.braco, SIMBOLO.haste].map((d) => achatar(d));
  const meia = SIMBOLO.largura / 2;
  const { posicoes } = alvoDoSimbolo(500);
  expect(posicoes).toHaveLength(1500);
  for (let i = 0; i < 500; i++) {
    const px = (posicoes[3 * i] / 1.15) * meia + meia;
    const py = SIMBOLO.altura / 2 - (posicoes[3 * i + 1] / 1.15) * meia;
    expect(caminhos.some((c) => dentro(c, px, py))).toBe(true);
  }
});
