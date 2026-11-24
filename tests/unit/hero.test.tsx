import { act, render } from '@testing-library/react';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { Hero } from '@/secoes/hero';

afterEach(() => vi.unstubAllEnvs());

const montar = () => render(<Hero />).container;
// textContent com os espaços normalizados (o JSX quebra linhas entre os pedaços).
const texto = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim();

test('o selo tem (01) e "Sites e landing pages sob medida"; na oferta, a pílula entra depois, e o celular tem o texto curto', () => {
  const c = montar();
  const selo = c.querySelector('.hero-selo');
  expect(texto(selo)).toBe('(01) Sites e landing pages sob medida Black Friday Sites sob medida');
  const oferta = selo?.querySelector('[data-oferta]');
  expect(texto(oferta?.querySelector('.hero-pilula'))).toBe('Black Friday');
  expect(texto(oferta?.querySelector('.hero-selo-curto'))).toBe('Sites sob medida');
  expect(texto(selo?.querySelector('.hero-selo-longo'))).toBe('Sites e landing pages sob medida');
});

test('o título é o único h1, em duas linhas, com "vendem" em <em>', () => {
  const c = montar();
  const titulos = c.querySelectorAll('h1');
  expect(titulos).toHaveLength(1);
  expect(texto(titulos[0])).toBe('Sites que vendem. E que ninguém esquece.');
  expect(titulos[0].querySelector('em')?.textContent).toBe('vendem');
  expect([...titulos[0].querySelectorAll(':scope > span')].map(texto)).toEqual(['Sites que vendem.', 'E que ninguém esquece.']);
});

test('a palavra FLOWAY é um SVG escondido do leitor de tela, fora do h1', () => {
  const c = montar();
  const palavra = c.querySelector('.hero-palavra svg');
  expect(palavra).not.toBeNull();
  expect(palavra?.closest('[aria-hidden="true"]')).not.toBeNull();
  expect(c.querySelector('h1 svg')).toBeNull();
});

test('o apoio é o texto da captura', () => {
  expect(texto(montar().querySelector('.hero-apoio'))).toBe(
    'Estratégia, texto, design e animação no mesmo time. Do primeiro rascunho ao site no ar, feito para transformar visita em cliente.',
  );
});

test('os botões: "Iniciar um projeto →" para o contato e "Ver como funciona" para o Incluso', () => {
  const c = montar();
  const principal = c.querySelector<HTMLAnchorElement>('a.hero-botao');
  expect(texto(principal)).toBe('Iniciar um projeto →');
  expect(principal?.getAttribute('href')).toBe(DESTINO_DO_CONTATO);
  const secundario = c.querySelector<HTMLAnchorElement>('a.hero-link');
  expect(texto(secundario)).toBe('Ver como funciona');
  expect(secundario?.getAttribute('href')).toBe('#incluso');
});

test('a faixa de benefícios tem exatamente os quatro itens (sem Medição nem Animação e 3D)', () => {
  const c = montar();
  const itens = [...c.querySelectorAll('.hero-beneficios ul:not([aria-hidden]) li')].map(texto);
  expect(itens).toEqual(['Estratégia', 'Texto que vende', 'Design sob medida', 'Site rápido']);
  expect(c.textContent).not.toMatch(/Medição|Animação e 3D/);
});

test('na oferta, as linhas da condição do desktop e do celular, em [data-oferta], com "R$ 4.997" riscado', () => {
  const c = montar();
  const desktop = c.querySelector('[data-oferta] .hero-condicao-desktop');
  const celular = c.querySelector('[data-oferta] .hero-condicao-celular');
  expect(texto(desktop)).toBe('De R$ 4.997 por R$ 997 · entrega em até 3 dias · até 27/11 às 23h59.');
  expect(texto(celular)).toBe('Site de R$ 4.997 por R$ 997, entregue em até 3 dias, para projetos fechados até 27/11 às 23h59.');
  expect(desktop?.querySelector('s')?.textContent).toBe('R$ 4.997');
  expect(celular?.querySelector('s')?.textContent).toBe('R$ 4.997');
});

test('depois do fim, o build não tem a pílula nem a condição, e o selo fica inteiro', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-28T03:00:00Z');
  const c = montar();
  expect(c.querySelector('[data-oferta]')).toBeNull();
  expect(c.textContent).not.toMatch(/Black Friday|R\$ 997|27\/11/);
  expect(texto(c.querySelector('.hero-selo'))).toBe('(01) Sites e landing pages sob medida');
});

test('a seção é o #topo', () => {
  expect(montar().querySelector('section')?.id).toBe('topo');
});

test('a palavra é o 4º path da assinatura (public/marca), com a mesma translação', async () => {
  const { readFileSync } = await import('node:fs');
  const { PALAVRA } = await import('@/marca/palavra');
  const svg = readFileSync('public/marca/floway-assinatura-horizontal-fundo-claro.svg', 'utf8');
  const paths = [...svg.matchAll(/<path([^>]*)\/>/g)].map((m) => m[1]);
  expect(paths).toHaveLength(4);
  expect(PALAVRA.d).toBe(paths[3].match(/\sd="([^"]+)"/)![1]);
  const [, x, y] = paths[3].match(/translate\(([\d.]+) ([\d.]+)\)/)!;
  expect(PALAVRA.translacao).toEqual([Number(x), Number(y)]);
});

describe('entrada no desktop com a cena', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock('@/lib/webgl', () => ({ marcarModo: () => 'desktop' }));
    vi.doMock('@/secoes/hero/CenaHero', () => ({ CenaHero: () => null }));
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.doUnmock('@/lib/webgl');
    vi.doUnmock('@/secoes/hero/CenaHero');
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // O CI (SwiftShader, máquina lenta) monta a seção tarde: o prazo conta do início da carga, não da montagem.
  test('montada tarde (1,5 s depois do início da carga), a seção fica pronta até 1,7 s, sem esperar a cena', async () => {
    vi.spyOn(performance, 'now').mockReturnValue(1500);
    const { Hero: HeroComCena } = await import('@/secoes/hero');
    const secao = render(<HeroComCena />).container.querySelector('section')!;
    expect(secao.dataset.entrada).toBeUndefined();
    act(() => vi.advanceTimersByTime(200));
    expect(secao.dataset.entrada).toBe('pronta');
  });
});
