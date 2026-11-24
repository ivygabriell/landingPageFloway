import { INCLUSO } from '@/conteudo/incluso';

// Preço com âncora e o glitch da palavra FLOWAY só em CSS (estilo.css): a cópia azul fica atrás, deslocada;
// as fatias (recortes fixos por clip-path) só aparecem durante o tremor. Cópias são decoração, fora do leitor de tela.
export function Preco() {
  return (
    <div className="incluso__preco">
      <p className="incluso__ancora">
        <s>{INCLUSO.de}</s> <span className="incluso__desconto">{INCLUSO.desconto}</span>{' '}
        <span className="incluso__por">{INCLUSO.por}</span>
      </p>
      <p className="incluso__valor">
        {INCLUSO.preco}
        <span className="incluso__copia" aria-hidden="true">{INCLUSO.preco}</span>
        <span className="incluso__fatia incluso__fatia--alta" aria-hidden="true">{INCLUSO.preco}</span>
        <span className="incluso__fatia incluso__fatia--baixa" aria-hidden="true">{INCLUSO.preco}</span>
      </p>
    </div>
  );
}
