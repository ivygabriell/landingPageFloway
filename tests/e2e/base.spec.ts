import { chromium, expect, test } from '@playwright/test';

const canal = process.env.CI ? undefined : 'chrome';

test('fora dos buscadores: meta noindex e robots.txt bloqueando tudo', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page).toHaveTitle('Floway · Sites e landing pages sob medida');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/Disallow: \/\s*$/m);
});

test('as seções estão na ordem da leva 1', async ({ page }) => {
  await page.goto('/');
  const ids = await page.locator('main > section').evaluateAll((s) => s.map((e) => e.id));
  expect(ids).toEqual(['topo', 'incluso', 'conceitos', 'perguntas', 'comecar']);
});

test('o HTML não tem e-mail, telefone nem link vazio', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
  expect(html).not.toMatch(/\(\d{2}\)\s?9?\d{4}-\d{4}/);
  expect(html).not.toMatch(/\+55\s?\d{2}/);
  expect(html).not.toMatch(/href=""/);
  expect(html).not.toMatch(/href="#"/);
});

test('carrega sem erro de página e com o canvas global no desktop', async ({ page }) => {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/modo-desktop/);
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.waitForTimeout(1000);
  expect(erros).toEqual([]);
});

test('sem WebGL: modo-sem-webgl e nenhum canvas', async ({ baseURL }) => {
  const navegador = await chromium.launch({ channel: canal, args: ['--disable-3d-apis', '--disable-webgl'] });
  try {
    const page = await navegador.newPage({ baseURL });
    const erros: string[] = [];
    page.on('pageerror', (e) => erros.push(e.message));
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/modo-sem-webgl/);
    await page.waitForTimeout(500);
    await expect(page.locator('canvas')).toHaveCount(0);
    expect(erros).toEqual([]);
  } finally {
    await navegador.close();
  }
});

test('movimento reduzido: modo-reduzido e nenhum canvas', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/modo-reduzido/);
  await page.waitForTimeout(500);
  await expect(page.locator('canvas')).toHaveCount(0);
});
