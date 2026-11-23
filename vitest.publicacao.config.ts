import { defineConfig } from 'vitest/config';

// Só a trava da publicação (tests/publicacao): fora do CI comum; falha enquanto a pessoa não der o destino dos botões.
export default defineConfig({
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
  test: { include: ['tests/publicacao/**/*.test.ts'], environment: 'node' },
});
