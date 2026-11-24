import { render, screen } from '@testing-library/react';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { ChamadaFinal } from '@/secoes/chamada-final';

afterEach(() => vi.useRealTimers());

const texto = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim();

test('a seção é a âncora #comecar, com o selo (05) Próximo passo', () => {
  const { container } = render(<ChamadaFinal />);
  const secao = container.querySelector('section#comecar');
  expect(secao).not.toBeNull();
  const selo = secao!.querySelector('.chamada__selo');
  expect(selo?.querySelector('.chamada__numero')?.textContent).toBe('(05)');
  expect(texto(selo)).toBe('(05) Próximo passo');
});

test('na oferta, o título é "Seu site novo. Em até 3 dias. Por R$ 997.", com "novo" em <em> e o resto em [data-oferta]', () => {
  render(<ChamadaFinal />);
  const titulo = screen.getByRole('heading', { level: 2 });
  expect(texto(titulo)).toBe('Seu site novo. Em até 3 dias. Por R$ 997.');
  expect(titulo.querySelector('em')?.textContent).toBe('novo');
  expect(texto(titulo.querySelector('[data-oferta]'))).toBe('Em até 3 dias. Por R$ 997.');
});

test('a condição tem R$ 4.997 riscado e fica em [data-oferta]', () => {
  const { container } = render(<ChamadaFinal />);
  const condicao = container.querySelector('.chamada__condicao');
  expect(texto(condicao)).toBe('Site de R$ 4.997 por R$ 997, entregue em até 3 dias, para projetos fechados até 27/11 às 23h59.');
  expect(condicao?.querySelector('s')?.textContent).toBe('R$ 4.997');
  expect(condicao?.closest('[data-oferta]')).not.toBeNull();
});

test('"A condição termina em" com a contagem longa, em [data-oferta]', () => {
  vi.useFakeTimers({ now: new Date('2026-11-23T16:47:24-03:00') });
  const { container } = render(<ChamadaFinal />);
  const relogio = container.querySelector('.chamada__relogio');
  expect(relogio?.closest('[data-oferta]')).not.toBeNull();
  expect(relogio?.querySelector('.chamada__rotulo')?.textContent).toBe('A condição termina em');
  expect(relogio?.querySelector('.chamada__contagem')?.textContent).toBe('04d 07h 12m 36s');
});

test('o botão "Iniciar um projeto →" leva ao destino do contato (a seta não é lida)', () => {
  render(<ChamadaFinal />);
  const botao = screen.getByRole('link', { name: 'Iniciar um projeto' });
  expect(texto(botao)).toBe('Iniciar um projeto →');
  expect(botao.getAttribute('href')).toBe(DESTINO_DO_CONTATO);
});

test('depois do fim, o título é só "Seu site novo." e não há condição nem contagem no HTML', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-28T03:00:00Z');
  const { container } = render(<ChamadaFinal />);
  expect(texto(screen.getByRole('heading', { level: 2 }))).toBe('Seu site novo.');
  expect(container.querySelector('.chamada__condicao')).toBeNull();
  expect(container.querySelector('.chamada__relogio')).toBeNull();
  expect(container.textContent).not.toMatch(/R\$|4\.997|27\/11/);
  expect(screen.getByRole('link', { name: 'Iniciar um projeto' })).not.toBeNull();
});

test('o rodapé tem o logo, o descritor e "© 2026 Floway", sem e-mail nem telefone', () => {
  const { container } = render(<ChamadaFinal />);
  const rodape = container.querySelector('footer.rodape')!;
  expect(rodape).not.toBeNull();
  expect(rodape.querySelector('img[src="/marca/floway-assinatura-horizontal-fundo-claro.svg"]')?.getAttribute('alt')).toBe('Floway');
  expect(texto(rodape.querySelector('.rodape__descritor'))).toBe('Sites, landing pages e automações');
  expect(texto(rodape.querySelector('.rodape__direitos'))).toBe('© 2026 Floway');
  expect(rodape.textContent).not.toMatch(/@|\(?\d{2}\)?\s?\d{4,5}-?\d{4}/);
  expect(rodape.querySelector('a[href^="mailto:"], a[href^="tel:"]')).toBeNull();
});

test('o F parado (SVG do símbolo em --cor-azul) e as partículas paradas estão no HTML, para o reduzido e o sem WebGL', () => {
  const { container } = render(<ChamadaFinal />);
  const parado = container.querySelector('svg.esfera-parada');
  expect(parado?.getAttribute('aria-hidden')).toBe('true');
  expect(parado?.querySelectorAll('.esfera-parada__f path')).toHaveLength(3);
  expect(parado!.querySelectorAll('circle').length).toBeGreaterThan(100);
});
