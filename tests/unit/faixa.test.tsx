import { render } from '@testing-library/react';
import { FaixaDeUrgencia } from '@/secoes/faixa';

afterEach(() => vi.useRealTimers());

test('a faixa do desktop tem a oferta completa, com R$ 4.997 riscado', () => {
  const { container } = render(<FaixaDeUrgencia />);
  const desktop = container.querySelector('.faixa__texto--desktop');
  expect(desktop?.textContent).toBe('Black Friday · Site de R$ 4.997 por R$ 997, entregue em até 3 dias · até 27/11 às 23h59');
  expect(desktop?.querySelector('s')?.textContent).toBe('R$ 4.997');
});

test('a faixa do celular tem a oferta curta, com R$ 4.997 riscado', () => {
  const { container } = render(<FaixaDeUrgencia />);
  const celular = container.querySelector('.faixa__texto--celular');
  expect(celular?.textContent).toBe('De R$ 4.997 por R$ 997');
  expect(celular?.querySelector('s')?.textContent).toBe('R$ 4.997');
});

test('a faixa inteira, com as duas contagens, está dentro de [data-oferta]', () => {
  vi.useFakeTimers({ now: new Date('2026-11-27T23:58:30-03:00') });
  const { container } = render(<FaixaDeUrgencia />);
  const oferta = container.querySelector('[data-oferta]');
  expect(oferta?.querySelector('.faixa__texto--desktop')).not.toBeNull();
  expect(oferta?.querySelector('.faixa__texto--celular')).not.toBeNull();
  expect(oferta?.querySelector('.faixa__contagem--celular')?.textContent).toBe('00d 00h 02m');
  expect(oferta?.querySelector('.faixa__contagem--desktop')?.textContent).toBe('00d 00h 01m 30s');
});

test('depois do fim, a faixa não sai no HTML', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-28T03:00:00Z');
  const { container } = render(<FaixaDeUrgencia />);
  expect(container.textContent).toBe('');
});
