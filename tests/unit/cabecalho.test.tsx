import { fireEvent, render, screen, within } from '@testing-library/react';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { Cabecalho } from '@/secoes/cabecalho';

test('o logo é a assinatura da Floway e leva ao topo', () => {
  render(<Cabecalho />);
  const logo = screen.getByRole('img', { name: 'Floway' });
  expect(logo.getAttribute('src')).toBe('/marca/floway-assinatura-horizontal-fundo-claro.svg');
  expect(logo.closest('a')?.getAttribute('href')).toBe('#topo');
});

test('os links das seções da leva 1', () => {
  render(<Cabecalho />);
  const nav = screen.getByRole('navigation', { name: 'Seções' });
  const links = within(nav).getAllByRole('link');
  expect(links.map((l) => [l.textContent, l.getAttribute('href')])).toEqual([
    ['Incluso', '#incluso'],
    ['Conceitos', '#conceitos'],
    ['Perguntas', '#perguntas'],
  ]);
});

test('o botão de contato usa o destino único', () => {
  render(<Cabecalho />);
  const botao = screen.getByRole('link', { name: /Iniciar um projeto/ });
  expect(botao.getAttribute('href')).toBe(DESTINO_DO_CONTATO);
});

test('o botão Menu abre e fecha o menu, e Esc fecha e devolve o foco', () => {
  render(<Cabecalho />);
  const menu = screen.getByRole('button', { name: 'Menu' });
  const painel = document.getElementById(menu.getAttribute('aria-controls')!)!;
  expect(menu.getAttribute('aria-expanded')).toBe('false');
  expect(painel.hidden).toBe(true);

  fireEvent.click(menu);
  expect(menu.getAttribute('aria-expanded')).toBe('true');
  expect(painel.hidden).toBe(false);
  const perguntas = within(painel).getByRole('link', { name: 'Perguntas' });
  perguntas.focus();

  fireEvent.keyDown(perguntas, { key: 'Escape' });
  expect(menu.getAttribute('aria-expanded')).toBe('false');
  expect(painel.hidden).toBe(true);
  expect(document.activeElement).toBe(menu);
});

test('clicar num link do menu fecha o menu', () => {
  render(<Cabecalho />);
  const menu = screen.getByRole('button', { name: 'Menu' });
  fireEvent.click(menu);
  const painel = document.getElementById(menu.getAttribute('aria-controls')!)!;
  fireEvent.click(within(painel).getByRole('link', { name: 'Incluso' }));
  expect(painel.hidden).toBe(true);
});

test('o botão de contato fica fora do menu', () => {
  render(<Cabecalho />);
  const menu = screen.getByRole('button', { name: 'Menu' });
  const painel = document.getElementById(menu.getAttribute('aria-controls')!)!;
  expect(painel.querySelector(`a[href="${DESTINO_DO_CONTATO}"]`)).toBeNull();
});
