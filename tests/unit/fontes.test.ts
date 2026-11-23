// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

// O build não pode depender do Google Fonts: no CI, URLs sem extensão quebravam o next/font/google.
const src = join(process.cwd(), 'src');
const codigo = readFileSync(join(src, 'fontes.ts'), 'utf8');
const arquivos = [...codigo.matchAll(/path:\s*'([^']+)'/g)].map((m) => join(src, m[1]));

test('as fontes não vêm do Google', () => {
  expect(codigo).not.toMatch(/from 'next\/font\/google'/);
  expect(codigo).toMatch(/from 'next\/font\/local'/);
});

test('cada arquivo de fonte referenciado existe, em woff2', () => {
  // Inter Tight 5 pesos + Azeret Mono 3 + Instrument Serif normal e itálico.
  expect(arquivos).toHaveLength(10);
  for (const a of arquivos) {
    expect(a).toMatch(/\.woff2$/);
    expect(existsSync(a), a).toBe(true);
  }
});

test('cada família tem o OFL.txt ao lado', () => {
  const familias = new Set(arquivos.map(dirname));
  expect(familias.size).toBe(3);
  for (const f of familias) expect(readFileSync(join(f, 'OFL.txt'), 'utf8')).toMatch(/SIL Open Font License/);
});
