import { expect, test } from 'vitest';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';

// Trava da publicação (spec 4.3): a página não vai ao ar com os botões apontando para a própria chamada final.
// Falhar agora é o esperado, até a pessoa dar o destino (o formulário da Floway). Fora do CI comum.
test('os botões de contato levam a um destino de verdade', () => {
  expect(DESTINO_DO_CONTATO).not.toBe('#comecar');
  expect(DESTINO_DO_CONTATO).toMatch(/^https:\/\//);
});
