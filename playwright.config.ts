import { defineConfig } from '@playwright/test';

// Fora do CI usa o Chrome instalado na máquina; no CI, o Chromium do Playwright.
const canal = process.env.CI ? undefined : 'chrome';
// Outra porta com PORTA_E2E: as worktrees das tarefas paralelas rodam o e2e ao mesmo tempo na mesma máquina.
const porta = process.env.PORTA_E2E || '3100';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  workers: 1,
  use: { baseURL: `http://localhost:${porta}`, channel: canal, viewport: { width: 1440, height: 900 } },
  webServer: {
    // O mesmo que `python3 -m http.server ${porta} -d out`, com a fila de conexões maior (ver o arquivo).
    command: `python3 tests/e2e/servidor.py ${porta}`,
    url: `http://localhost:${porta}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
