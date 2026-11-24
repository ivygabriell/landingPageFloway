import { PALAVRA } from '@/marca/palavra';

// A palavra FLOWAY desenhada em canvas a partir do path da assinatura (não depende de fonte), em branco: é a máscara do
// plano com glitch do hero (a cor vem do shader). `largura` é a do recorte da palavra (viewBox); `margem` (fração dela)
// sobra de cada lado, para a cópia azul e as fatias deslocadas não serem cortadas. Adaptado do site oficial.
export function desenharPalavra(largura: number, margem: number): HTMLCanvasElement {
  const [x, y, l, a] = PALAVRA.viewBox;
  const escala = largura / l;
  const tela = document.createElement('canvas');
  tela.width = Math.ceil(largura * (1 + 2 * margem));
  tela.height = Math.ceil(a * escala);
  const ctx = tela.getContext('2d')!;
  ctx.translate(largura * margem, 0);
  ctx.scale(escala, escala);
  ctx.translate(PALAVRA.translacao[0] - x, PALAVRA.translacao[1] - y);
  ctx.fillStyle = '#fff';
  ctx.fill(new Path2D(PALAVRA.d));
  return tela;
}
