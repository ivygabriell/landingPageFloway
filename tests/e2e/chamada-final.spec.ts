import { expect, test, type Page } from '@playwright/test';

// R-10 e R-12: a contagem, o F parado sem WebGL e no reduzido, o fim da oferta e o botão da captura.
const NA_OFERTA = new Date('2026-11-23T16:47:24-03:00');
const DEPOIS_DO_FIM = new Date('2026-11-28T00:00:01-03:00');
const TELAS = [
  { nome: 'celular', width: 390, height: 844, botao: { width: 350, height: 60, x: 20 } },
  { nome: 'desktop', width: 1440, height: 900, botao: { width: 300, height: 68, x: 48 } },
];
const AZUL = 'rgb(0, 47, 167)';

const irAteAChamada = async (page: Page) => {
  await page.goto('/');
  await page.locator('#comecar').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
};
const botao = (page: Page) => page.locator('#comecar').getByRole('link', { name: 'Iniciar um projeto' });

test('com o relógio em 23/11 16h47min24s (UTC−3), a contagem mostra "04d 07h 12m 36s"', async ({ page }) => {
  await page.clock.install({ time: new Date(NA_OFERTA.getTime() - 1000) });
  await page.clock.pauseAt(NA_OFERTA);
  await irAteAChamada(page);
  await expect(page.locator('.chamada__rotulo')).toBeVisible();
  await expect(page.locator('.chamada__contagem')).toHaveText('04d 07h 12m 36s');
  await expect(page.locator('.chamada__condicao')).toBeVisible();
});

const conferirFParado = async (page: Page) => {
  const f = page.locator('#comecar .esfera-parada__f');
  await expect(f).toBeVisible();
  expect(await f.evaluate((el) => getComputedStyle(el).fill)).toBe(AZUL);
  expect(await page.locator('#comecar .esfera-parada circle').count()).toBeGreaterThan(100);
  await expect(page.locator('canvas')).toHaveCount(0);
};

test('sem WebGL, o F aparece parado em --cor-azul, com as partículas paradas, e não há <canvas>', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, tipo: string, ...resto: unknown[]) {
      if (/webgl/.test(tipo)) return null;
      return (original as (...a: unknown[]) => unknown).call(this, tipo, ...resto);
    } as typeof original;
  });
  await irAteAChamada(page);
  await expect(page.locator('html')).toHaveClass(/modo-sem-webgl/);
  await conferirFParado(page);
});

test('com movimento reduzido, o F aparece parado e não há <canvas>', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await irAteAChamada(page);
  await expect(page.locator('html')).toHaveClass(/modo-reduzido/);
  await conferirFParado(page);
});

for (const tela of TELAS) {
  test(`${tela.nome}: o botão fica no lugar e no tamanho da captura`, async ({ page }) => {
    await page.setViewportSize(tela);
    await page.clock.install({ time: NA_OFERTA });
    await irAteAChamada(page);
    const caixa = (await botao(page).boundingBox())!;
    expect(Math.abs(caixa.width - tela.botao.width)).toBeLessThanOrEqual(2);
    expect(Math.abs(caixa.height - tela.botao.height)).toBeLessThanOrEqual(2);
    expect(Math.abs(caixa.x - tela.botao.x)).toBeLessThanOrEqual(2);
    expect(await botao(page).getAttribute('href')).toBe('#comecar');
  });

  test(`${tela.nome}: depois do fim, o título é "Seu site novo." e somem a condição e a contagem`, async ({ page }) => {
    await page.setViewportSize(tela);
    await page.clock.install({ time: DEPOIS_DO_FIM });
    await irAteAChamada(page);
    await expect(page.locator('#comecar h2')).toHaveText('Seu site novo.', { useInnerText: true });
    await expect(page.locator('.chamada__condicao')).toBeHidden();
    await expect(page.locator('.chamada__relogio')).toBeHidden();
    await expect(botao(page)).toBeVisible();
  });
}

test('desktop com WebGL: a cena monta perto da seção e a esfera parada sai de vista', async ({ page }) => {
  await page.goto('/');
  const modo = await page.locator('html').getAttribute('class');
  test.skip(!/modo-desktop/.test(modo ?? ''), 'este navegador não tem WebGL');
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.locator('#comecar').scrollIntoViewIfNeeded();
  await expect(page.locator('.chamada__esfera--cena')).toHaveCount(1);
  await expect(page.locator('#comecar .esfera-parada')).toBeHidden();
});
