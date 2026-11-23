import { chromium, expect, test, type Browser, type Page } from '@playwright/test';

const canal = process.env.CI ? undefined : 'chrome';
const NA_OFERTA = new Date('2026-11-25T12:00:00-03:00');
const DEPOIS_DO_FIM = new Date('2026-11-28T00:00:01-03:00');
const TELAS = [
  { nome: 'celular', width: 390, height: 844 },
  { nome: 'desktop', width: 1440, height: 900 },
] as const;

// Sem WebGL: um navegador à parte, como no base.spec.ts.
async function semWebgl<T>(baseURL: string | undefined, fn: (page: Page) => Promise<T>) {
  const navegador: Browser = await chromium.launch({ channel: canal, args: ['--disable-3d-apis', '--disable-webgl'] });
  try {
    return await fn(await navegador.newPage({ baseURL }));
  } finally {
    await navegador.close();
  }
}

// A caixa inteira dentro da janela, sem rolar.
async function dentroDaJanela(page: Page, seletor: string) {
  const el = page.locator(seletor);
  await expect(el).toBeVisible();
  const caixa = (await el.boundingBox())!;
  const janela = page.viewportSize()!;
  expect(caixa.y, seletor).toBeGreaterThanOrEqual(0);
  expect(caixa.y + caixa.height, seletor).toBeLessThanOrEqual(janela.height);
  expect(caixa.x + caixa.width, seletor).toBeLessThanOrEqual(janela.width);
}

for (const tela of TELAS) {
  test(`${tela.nome}: título, apoio, botão e a linha da oferta cabem na janela sem rolar (R-01)`, async ({ page }) => {
    await page.setViewportSize(tela);
    await page.clock.install({ time: NA_OFERTA });
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    for (const s of ['#topo h1', '.hero-apoio', 'a.hero-botao', `.hero-condicao-${tela.nome}`, '.hero-pilula']) await dentroDaJanela(page, s);
    // A linha do outro tamanho fica escondida.
    await expect(page.locator(`.hero-condicao-${tela.nome === 'celular' ? 'desktop' : 'celular'}`)).toBeHidden();
    await expect(page.locator('.hero-selo-curto')).toBeVisible({ visible: tela.nome === 'celular' });
    await expect(page.locator('.hero-selo-longo')).toBeVisible({ visible: tela.nome === 'desktop' });
  });

  test(`${tela.nome}: depois do fim, o selo Black Friday e a linha da condição somem`, async ({ page }) => {
    await page.setViewportSize(tela);
    await page.clock.install({ time: DEPOIS_DO_FIM });
    await page.goto('/');
    await expect(page.locator('.hero-pilula')).toBeHidden();
    await expect(page.locator('.hero-condicao-celular')).toBeHidden();
    await expect(page.locator('.hero-condicao-desktop')).toBeHidden();
    await expect(page.locator('.hero-selo-longo')).toBeVisible();
    await dentroDaJanela(page, 'a.hero-botao');
  });
}

async function cliqueRapido(page: Page) {
  await page.goto('/');
  await page.waitForTimeout(300);
  await page.locator('a.hero-botao').click({ timeout: 500 });
  await expect(page).toHaveURL(/#comecar$/);
}

test('o botão principal recebe o clique 300 ms depois do carregamento (a entrada não bloqueia)', async ({ page }) => {
  await cliqueRapido(page);
});

test('sem WebGL, o botão principal também recebe o clique em 300 ms', async ({ baseURL }) => {
  await semWebgl(baseURL, cliqueRapido);
});

async function entradaEmDoisSegundos(page: Page) {
  await page.goto('/');
  await expect(page.locator('#topo')).toHaveAttribute('data-entrada', 'pronta', { timeout: 2000 });
}

test('a entrada termina em até 2 s, sem erro de página nem de console', async ({ page }) => {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  page.on('console', (m) => void (m.type() === 'error' && erros.push(m.text())));
  await entradaEmDoisSegundos(page);
  await page.mouse.move(300, 300);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(600);
  expect(erros).toEqual([]);
});

test('sem WebGL, a entrada termina em até 2 s', async ({ baseURL }) => {
  await semWebgl(baseURL, entradaEmDoisSegundos);
});

test('no reduzido, a entrada termina em até 2 s', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await entradaEmDoisSegundos(page);
});

// A palavra em SVG aparece e a faixa de benefícios fica parada (mesma posição com 1 s de intervalo).
async function paradoEVisivel(page: Page) {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/modo-(reduzido|sem-webgl)/);
  await expect(page.locator('.hero-camada-base svg')).toBeVisible();
  const item = page.locator('.hero-trilho li').first();
  const antes = (await item.boundingBox())!.x;
  await page.waitForTimeout(1000);
  expect((await item.boundingBox())!.x).toBe(antes);
}

test('no reduzido, a palavra em SVG fica visível e a faixa de benefícios não se move', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await paradoEVisivel(page);
});

test('sem WebGL, a palavra em SVG fica visível e a faixa de benefícios não se move', async ({ baseURL }) => {
  await semWebgl(baseURL, paradoEVisivel);
});

test('com movimento, a faixa de benefícios corre', async ({ page }) => {
  await page.goto('/');
  const item = page.locator('.hero-trilho li').first();
  const antes = (await item.boundingBox())!.x;
  await page.waitForTimeout(1000);
  expect((await item.boundingBox())!.x).toBeLessThan(antes);
});
