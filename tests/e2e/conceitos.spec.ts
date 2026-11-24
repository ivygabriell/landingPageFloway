import { expect, test, type Page } from '@playwright/test';

const cartoes = (page: Page) => page.locator('#conceitos a.cartao');
const posicoesX = (page: Page) => cartoes(page).evaluateAll((as) => as.map((a) => Math.round(a.getBoundingClientRect().left)));
const alturaDoTopoFixo = (page: Page) =>
  page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop));

test('Tab chega a cada cartão, na ordem, e mostra "Abrir o site ↗" no cartão em foco', async ({ page }) => {
  await page.goto('/');
  await page.locator('#incluso a').last().focus();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    const cartao = cartoes(page).nth(i);
    await expect(cartao).toBeFocused();
    await expect(cartao.locator('.cartao__abrir')).toBeVisible();
    await expect(cartao.locator('.cartao__abrir')).toHaveText('Abrir o site ↗');
    await expect(cartao).toBeInViewport();
    // Os outros cartões não mostram o "Abrir o site".
    await expect(cartoes(page).nth((i + 1) % 5).locator('.cartao__abrir')).toBeHidden();
  }
});

test('desktop: rolar a página move a galeria na horizontal até o quinto cartão', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#conceitos')).toHaveClass(/conceitos--presa/);
  const topo = await page.locator('#conceitos .conceitos__presa').evaluate((el) => el.getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => scrollTo(0, y - parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + 2), topo);
  const antes = await posicoesX(page);
  await expect(cartoes(page).nth(4)).not.toBeInViewport({ ratio: 1 });
  await page.mouse.wheel(0, 3000);
  await expect(cartoes(page).nth(4)).toBeInViewport({ ratio: 1 });
  expect((await posicoesX(page))[0]).toBeLessThan(antes[0] - 500);
  // Presa: o topo da seção segue abaixo do cabeçalho fixo.
  const presa = await page.locator('#conceitos .conceitos__presa').evaluate((el) => el.getBoundingClientRect().top);
  expect(Math.abs(presa - (await alturaDoTopoFixo(page)))).toBeLessThan(2);
});

test('depois do pin, as âncoras #perguntas e #comecar caem abaixo do cabeçalho fixo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#conceitos')).toHaveClass(/conceitos--presa/);
  await page.waitForTimeout(300);
  for (const id of ['perguntas', 'comecar']) {
    await page.evaluate((h) => (location.hash = h), `#${id}`);
    await page.waitForTimeout(100);
    const topo = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
    const fixo = await alturaDoTopoFixo(page);
    // A última seção pode não chegar ao topo (fim da página), mas nunca fica embaixo do cabeçalho.
    expect(topo).toBeGreaterThanOrEqual(fixo - 1);
    if (id === 'perguntas') expect(topo).toBeLessThan(fixo + 2);
  }
});

test.describe('celular (390)', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test('a galeria rola para o lado com encaixe e a página não ganha rolagem horizontal', async ({ page }) => {
    await page.goto('/');
    const galeria = page.locator('#conceitos .conceitos__galeria');
    await expect(galeria).toHaveCSS('scroll-snap-type', 'x mandatory');
    await expect(page.locator('#conceitos')).not.toHaveClass(/conceitos--presa/);
    await galeria.scrollIntoViewIfNeeded();
    await galeria.evaluate((el) => el.scrollBy({ left: 400, behavior: 'instant' }));
    await expect.poll(() => galeria.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
    const largura = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
    expect(largura[0]).toBeLessThanOrEqual(largura[1]);
  });
});

test('no reduzido, a seção não fica presa (sem pin-spacer) e a galeria rola para o lado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/modo-reduzido/);
  await page.waitForTimeout(500);
  await expect(page.locator('#conceitos .pin-spacer')).toHaveCount(0);
  await expect(page.locator('#conceitos')).not.toHaveClass(/conceitos--presa/);
  await expect(page.locator('#conceitos .conceitos__galeria')).toHaveCSS('overflow-x', 'auto');
});

test('com a capa bloqueada, o cartão mostra o nome e o fundo', async ({ page }) => {
  await page.route('**/capa.webp', (r) => r.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const cartao = cartoes(page).first();
  await cartao.scrollIntoViewIfNeeded();
  await expect(cartao.locator('.cartao__nome')).toHaveText('Ferramenta criativa');
  await expect(cartao.locator('.cartao__nome')).toBeVisible();
  await expect(cartao.locator('.cartao__capa')).toHaveCSS('background-color', 'rgb(220, 220, 216)');
  const capa = await cartao.locator('.cartao__capa').boundingBox();
  expect(capa?.height).toBeGreaterThan(300);
});
