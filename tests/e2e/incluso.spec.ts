import { chromium, expect, test, type Page } from '@playwright/test';

const canal = process.env.CI ? undefined : 'chrome';
const PRETO = 'rgb(18, 18, 18)';

const opacidade = (page: Page, seletor: string) =>
  page.locator(seletor).evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity));

test('a seção é o trecho escuro', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#incluso')).toHaveCSS('background-color', PRETO);
});

test('sem WebGL, a seção continua escura', async ({ baseURL }) => {
  const navegador = await chromium.launch({ channel: canal, args: ['--disable-3d-apis', '--disable-webgl'] });
  try {
    const page = await navegador.newPage({ baseURL });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/modo-sem-webgl/);
    await expect(page.locator('#incluso')).toHaveCSS('background-color', PRETO);
  } finally {
    await navegador.close();
  }
});

test('as caixas mostram o tempo que falta: 04, 07, 12, 36', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-23T16:47:23-03:00') });
  await page.clock.pauseAt(new Date('2026-11-23T16:47:24-03:00'));
  await page.goto('/');
  await expect(page.locator('.incluso__numero')).toHaveText(['04', '07', '12', '36']);
});

test('em repouso, o "R$ 997" grande não tem fatia do glitch visível', async ({ page }) => {
  await page.goto('/');
  await page.locator('#incluso').scrollIntoViewIfNeeded();
  await expect(page.locator('#incluso')).toHaveClass(/incluso--tremendo/);
  // Repouso = entre dois tremores: o ciclo de 6 s parado no meio (3 s).
  await page.locator('.incluso__fatia').evaluateAll((els) =>
    els.flatMap((e) => e.getAnimations()).forEach((a) => {
      a.pause();
      a.currentTime = 3000;
    }),
  );
  expect(await opacidade(page, '.incluso__fatia')).toEqual(['0', '0']);
});

test('no reduzido, mesmo com a seção na tela, a fatia não aparece e os ✓ estão marcados', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/modo-reduzido/);
  await page.locator('#incluso').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  expect(await opacidade(page, '.incluso__fatia')).toEqual(['0', '0']);
  const marcas = await page
    .locator('.incluso__lista li')
    .evaluateAll((lis) => lis.map((li) => getComputedStyle(li, '::before').opacity));
  expect(marcas).toEqual(['1', '1', '1', '1', '1', '1']);
});

test('depois do fim, o título e a lista ficam sem a oferta', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-28T00:00:01-03:00') });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-oferta', 'encerrada');
  expect(await page.locator('#incluso h2').innerText()).toBe('Um site completo. Do jeito que você quer.');
  expect((await page.locator('.incluso__lista-titulo').innerText()).toLowerCase()).toBe('tudo isso');
  for (const classe of ['preco', 'contagem', 'botao', 'condicao', 'black-friday'])
    await expect(page.locator(`.incluso__${classe}`)).toBeHidden();
});

test('o foco pelo teclado no botão mostra o mesmo estado do hover', async ({ page }) => {
  await page.goto('/');
  const botao = page.locator('.incluso__botao');
  await botao.scrollIntoViewIfNeeded();
  const estado = () =>
    botao.evaluate((b) => {
      const seta = b.querySelector('.incluso__seta')!;
      return [getComputedStyle(b).transform, getComputedStyle(seta).transform];
    });
  const repouso = await estado();

  await botao.hover();
  await page.waitForTimeout(600);
  const hover = await estado();
  expect(hover).not.toEqual(repouso);

  await page.mouse.move(0, 0);
  await page.keyboard.press('Shift+Tab');
  await botao.focus();
  await page.waitForTimeout(600);
  expect(await estado()).toEqual(hover);
});

test('pela âncora #incluso, o selo da seção não fica sob o cabeçalho', async ({ page }) => {
  await page.goto('/#incluso');
  await page.waitForTimeout(500);
  const baseDoCabecalho = await page.locator('.cabecalho').evaluate((c) => c.getBoundingClientRect().bottom);
  const topoDoSelo = await page.locator('.incluso__selo').evaluate((s) => s.getBoundingClientRect().top);
  expect(topoDoSelo).toBeGreaterThanOrEqual(baseDoCabecalho);
});
