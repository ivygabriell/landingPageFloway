import { act, render } from '@testing-library/react';
import { Contagem, useRestante } from '@/oferta/Contagem';
import { SemOferta, SoNaOferta } from '@/oferta/Oferta';
import { scriptDoFim } from '@/oferta/scriptDoFim';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.useRealTimers();
  delete document.documentElement.dataset.oferta;
});

test('na oferta, SoNaOferta renderiza com data-oferta', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-27T12:00:00Z');
  const { container } = render(<SoNaOferta>R$ 997</SoNaOferta>);
  expect(container.querySelector('[data-oferta]')?.textContent).toBe('R$ 997');
});

test('depois do fim, SoNaOferta não renderiza nada e SemOferta sim', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-28T03:00:00Z');
  const { container } = render(
    <>
      <SoNaOferta>R$ 997</SoNaOferta>
      <SemOferta>Seu site novo.</SemOferta>
    </>,
  );
  expect(container.textContent).toBe('Seu site novo.');
  expect(container.querySelector('[data-sem-oferta]')).not.toBeNull();
});

test('o invólucro usa a tag pedida', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-27T12:00:00Z');
  const { container } = render(
    <ul>
      <SoNaOferta as="li">por R$ 997</SoNaOferta>
      <SemOferta as="li">Tudo isso</SemOferta>
    </ul>,
  );
  expect(container.querySelector('li[data-oferta]')).not.toBeNull();
  expect(container.querySelector('li[data-sem-oferta]')).not.toBeNull();
});

test('a contagem anda a cada segundo e, no fim, some e marca a oferta encerrada', () => {
  vi.useFakeTimers({ now: new Date('2026-11-27T23:59:58-03:00') });
  const { container } = render(<Contagem formato="longa" />);
  expect(container.textContent).toBe('00d 00h 00m 02s');
  act(() => vi.advanceTimersByTime(1000));
  expect(container.textContent).toBe('00d 00h 00m 01s');
  act(() => vi.advanceTimersByTime(1000));
  expect(container.textContent).toBe('');
  expect(document.documentElement.dataset.oferta).toBe('encerrada');
});

test('a contagem curta mostra só dias, horas e minutos', () => {
  vi.useFakeTimers({ now: new Date('2026-11-27T23:58:30-03:00') });
  const { container } = render(<Contagem formato="curta" />);
  expect(container.textContent).toBe('00d 00h 02m');
});

test('useRestante dá as partes para as caixas do Incluso', () => {
  vi.useFakeTimers({ now: new Date('2026-11-23T16:47:24-03:00') });
  let visto: ReturnType<typeof useRestante> = null;
  function Caixas() {
    visto = useRestante();
    return null;
  }
  render(<Caixas />);
  expect(visto).toEqual({ dias: 4, horas: 7, minutos: 12, segundos: 36 });
});

test('o script do head marca a oferta encerrada só a partir do fim', () => {
  vi.useFakeTimers({ now: new Date('2026-11-27T23:59:59-03:00') });
  new Function(scriptDoFim)();
  expect(document.documentElement.dataset.oferta).toBeUndefined();
  vi.setSystemTime(new Date('2026-11-28T00:00:00-03:00'));
  new Function(scriptDoFim)();
  expect(document.documentElement.dataset.oferta).toBe('encerrada');
});
