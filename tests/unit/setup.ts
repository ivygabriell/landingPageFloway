import { afterAll, beforeEach, vi } from 'vitest';

// Nenhum teste depende do relógio real: o instante do build fica dentro da oferta (quem precisa de outro troca).
beforeEach(() => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-25T15:00:00Z');
});

if (typeof window !== 'undefined') {
  // O jsdom não implementa matchMedia; o ScrollTrigger e os componentes consultam ao carregar.
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({ matches: false, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false }) as MediaQueryList;
  }

  // Sem canvas no jsdom: os desenhos em canvas devolvem nada, como num navegador sem suporte.
  HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext;

  // O jsdom não tem a API de fontes; as seções esperam document.fonts.ready antes de desenhar.
  if (!('fonts' in document)) Object.defineProperty(document, 'fonts', { value: { ready: Promise.resolve() } });

  window.scrollTo = (() => {}) as typeof window.scrollTo;

  // O jsdom não tem IntersectionObserver (as cenas montam perto da tela): nada entra na tela aqui.
  (window as { IntersectionObserver?: unknown }).IntersectionObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };

  // O intervalo do ScrollTrigger e o relógio do GSAP param no fim de cada arquivo, antes de o jsdom sair.
  // Import dinâmico: o GSAP precisa do matchMedia acima já instalado quando carrega.
  afterAll(async () => (await import('./util/encerrar')).encerrarAnimacoes());
}
