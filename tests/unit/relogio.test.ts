import { contagemCurta, contagemLonga, estadoDaOferta, FIM_DA_OFERTA, ofertaNoBuild } from '@/oferta/relogio';

// Rodar também com TZ=Europe/Lisbon e TZ=America/Manaus: o resultado não muda (o relógio usa só milissegundos UTC).
const em = (s: string) => new Date(s);

afterEach(() => vi.unstubAllEnvs());

test('o fim é 28/11/2026 00h00 em UTC−3', () => {
  expect(FIM_DA_OFERTA.toISOString()).toBe('2026-11-28T03:00:00.000Z');
});

test('23h58min30s (UTC−3): celular 2 min, desktop 1 min 30 s', () => {
  expect(contagemCurta(em('2026-11-27T23:58:30-03:00'))).toBe('00d 00h 02m');
  expect(contagemLonga(em('2026-11-27T23:58:30-03:00'))).toBe('00d 00h 01m 30s');
});

test('23h59min59s ainda ativa, com 1 s; 00h00min00s encerrada', () => {
  expect(estadoDaOferta(em('2026-11-27T23:59:59-03:00'))).toEqual({ ativa: true, restante: { dias: 0, horas: 0, minutos: 0, segundos: 1 } });
  expect(estadoDaOferta(em('2026-11-28T00:00:00-03:00'))).toEqual({ ativa: false });
});

test('meio segundo antes do fim arredonda para 1 s e 1 min, nunca zero', () => {
  expect(contagemLonga(em('2026-11-27T23:59:59.500-03:00'))).toBe('00d 00h 00m 01s');
  expect(contagemCurta(em('2026-11-27T23:59:59.500-03:00'))).toBe('00d 00h 01m');
});

test('dias e horas: 23/11 16h47min24s (UTC−3)', () => {
  expect(contagemLonga(em('2026-11-23T16:47:24-03:00'))).toBe('04d 07h 12m 36s');
  expect(estadoDaOferta(em('2026-11-23T16:47:24-03:00'))).toEqual({ ativa: true, restante: { dias: 4, horas: 7, minutos: 12, segundos: 36 } });
});

test('vai-um da contagem curta: faltando 23h59min30s mostra 1 dia', () => {
  expect(contagemCurta(em('2026-11-27T00:00:30-03:00'))).toBe('01d 00h 00m');
});

test('ofertaNoBuild respeita OFERTA_AGORA', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-28T03:00:00Z');
  expect(ofertaNoBuild()).toBe(false);
  vi.stubEnv('OFERTA_AGORA', '2026-11-27T12:00:00Z');
  expect(ofertaNoBuild()).toBe(true);
});
