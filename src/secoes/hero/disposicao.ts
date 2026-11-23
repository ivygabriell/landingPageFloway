import { ehCelular } from '@/lib/ambiente';

// Onde a cena do hero desenha: o CSS (estilo.css) é quem dispõe a palavra e as lâminas, e a cena mede essas caixas
// e as leva para o mundo do canvas global (câmera em z = 600, 1 unidade = 1 px em z = 0, origem no meio da tela, y para cima).

// Glitch parado da captura (Penpot, `Hero · *`), em frações do quadro da palavra (o viewBox 1360×292): topo e altura de
// cada fatia e o deslocamento dela, e o da cópia azul (fração da largura). Os mesmos números estão em estilo.css.
export const GLITCH = {
  celular: { azul: -0.0086, fatias: [[0.365, 0.108, 0.0171], [0.634, 0.054, -0.0114]] },
  desktop: { azul: -0.0045, fatias: [[0.368, 0.0555, 0.0089], [0.639, 0.0277, -0.0067]] },
} as const;

// Sobra do plano da palavra de cada lado (fração da largura), para o deslocamento das fatias e da cópia azul.
export const MARGEM_DA_PALAVRA = 0.03;

// As fatias no plano da palavra: (v de baixo, v de cima, deslocamento em u), com v de baixo para cima.
export function fatiasNoPlano(largura: number): [number, number, number][] {
  const { fatias } = GLITCH[ehCelular(largura) ? 'celular' : 'desktop'];
  const escala = 1 / (1 + 2 * MARGEM_DA_PALAVRA);
  return fatias.map(([topo, altura, dx]) => [1 - topo - altura, 1 - topo, dx * escala]);
}

export const azulNoPlano = (largura: number) => GLITCH[ehCelular(largura) ? 'celular' : 'desktop'].azul / (1 + 2 * MARGEM_DA_PALAVRA);

export type Caixa = { x: number; y: number; largura: number; altura: number };

// Centro de um elemento no mundo do canvas com a página no topo (a cena soma a rolagem a cada quadro). A caixa vem do
// getBoundingClientRect (a rotação não muda o centro); largura e altura, do tamanho sem transformação (offsetWidth/Height).
export function noMundo(
  caixa: { left: number; top: number; width: number; height: number },
  tamanho: { largura: number; altura: number },
  rolagem: number,
  janela: { largura: number; altura: number },
): Caixa {
  return {
    x: caixa.left + caixa.width / 2 - janela.largura / 2,
    y: janela.altura / 2 - (caixa.top + rolagem + caixa.height / 2),
    ...tamanho,
  };
}

// Quanto as lâminas deslizam na horizontal por px de rolagem (Notas · Hero: "as lâminas deslizam na horizontal").
export const DESLIZE = 0.35;
// Inclinação máxima das lâminas na direção do cursor (rad), só no desktop.
export const INCLINACAO_DO_CURSOR = { x: 0.12, y: 0.22 };
// A entrada só toca se a cena chegar até este instante da carga (ms): termina antes de 2 s (R-01). Depois, a cena
// entra já no repouso.
export const INICIO_MAXIMO_DA_ENTRADA = 600;
