import { chromium, expect, test, type Page } from '@playwright/test';

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

// O three (WebGLRenderer) só é baixado quando o canvas vai montar: sem WebGL e no reduzido, nenhum script o traz.
async function scriptsComThree(page: Page) {
  const achados: string[] = [];
  const pendentes: Promise<void>[] = [];
  page.on('response', (r) => {
    if (!r.url().endsWith('.js')) return;
    pendentes.push(r.text().then((js) => void (js.includes('WebGLRenderer') && achados.push(r.url())), () => {}));
  });
  return async () => {
    await page.waitForTimeout(1000);
    await Promise.all(pendentes);
    return achados;
  };
}

test('carrega sem erro de página e com o canvas global no desktop', async ({ page }) => {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/modo-desktop/);
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.waitForTimeout(1000);
  expect(erros).toEqual([]);
});

test('sem WebGL: modo-sem-webgl, nenhum canvas e o three não é baixado', async ({ baseURL }) => {
  const navegador = await chromium.launch({ channel: canal, args: ['--disable-3d-apis', '--disable-webgl'] });
  try {
    const page = await navegador.newPage({ baseURL });
    const erros: string[] = [];
    page.on('pageerror', (e) => erros.push(e.message));
    const comThree = await scriptsComThree(page);
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/modo-sem-webgl/);
    expect(await comThree()).toEqual([]);
    await expect(page.locator('canvas')).toHaveCount(0);
    expect(erros).toEqual([]);
  } finally {
    await navegador.close();
  }
});

test('movimento reduzido: modo-reduzido, nenhum canvas e o three não é baixado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const comThree = await scriptsComThree(page);
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/modo-reduzido/);
  expect(await comThree()).toEqual([]);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('as fontes são do próprio site: nada do Google e as três famílias carregam', async ({ page }) => {
  const doGoogle: string[] = [];
  page.on('request', (r) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) doGoogle.push(r.url());
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const carregadas = await page.evaluate(async () => {
    const raiz = getComputedStyle(document.documentElement);
    const familia = (v: string) => raiz.getPropertyValue(v).split(',')[0].trim();
    const pedidos = [
      `400 16px ${familia('--fonte-sans')}`,
      `500 16px ${familia('--fonte-mono')}`,
      `italic 400 16px ${familia('--fonte-serif')}`,
    ];
    // load() baixa a face pedida mesmo se a página ainda não a usou; check() confirma que está pronta.
    return Promise.all(pedidos.map(async (p) => (await document.fonts.load(p)).length > 0 && document.fonts.check(p)));
  });
  expect(carregadas).toEqual([true, true, true]);
  expect(doGoogle).toEqual([]);
});
