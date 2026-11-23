import { expect, test, type Page } from '@playwright/test';

// R-02 e R-12, foco 4 da revisão: a faixa e o cabeçalho presos no topo, sem se cobrir, e o menu do celular pelo teclado.
const NA_OFERTA = new Date('2026-11-25T12:00:00-03:00');
const DEPOIS_DO_FIM = new Date('2026-11-28T00:00:01-03:00');
const TELAS = [
  { nome: 'celular', width: 390, height: 844 },
  { nome: 'desktop', width: 1440, height: 900 },
];

const caixa = async (page: Page, seletor: string) => (await page.locator(seletor).first().boundingBox())!;
// Enquanto as seções da leva 1 são construídas em paralelo, a página pode ser curta (e o hero ainda sem o afastamento
// da faixa e do cabeçalho fixos): um respiro antes e depois das seções garante que o link precise rolar até a âncora.
const abrir = async (page: Page) => {
  await page.goto('/');
  await page.evaluate(() => {
    const respiro = () => Object.assign(document.createElement('div'), { style: 'height: 150vh' });
    document.querySelector('main')!.prepend(respiro());
    document.body.append(respiro(), respiro());
  });
};
// O relógio parado no instante da oferta, para conferir a contagem exata.
const pararNaOferta = async (page: Page) => {
  await page.clock.install({ time: new Date(NA_OFERTA.getTime() - 1000) });
  await page.clock.pauseAt(NA_OFERTA);
};
const contato = (page: Page) => page.locator('.cabecalho').getByRole('link', { name: /Iniciar um projeto/ });

for (const tela of TELAS) {
  test(`${tela.nome}: a faixa no topo, o cabeçalho logo abaixo, e o contato visível até o fim`, async ({ page }) => {
    await page.setViewportSize(tela);
    await page.clock.install({ time: NA_OFERTA });
    await abrir(page);

    const faixa = await caixa(page, '.faixa__barra');
    const cabecalho = await caixa(page, '.cabecalho');
    expect(faixa.y).toBe(0);
    expect(faixa.height).toBe(tela.nome === 'celular' ? 36 : 40);
    expect(cabecalho.y).toBeGreaterThanOrEqual(faixa.y + faixa.height);

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(200);
    const faixaNoFim = await caixa(page, '.faixa__barra');
    const cabecalhoNoFim = await caixa(page, '.cabecalho');
    expect(faixaNoFim.y).toBe(0);
    expect(cabecalhoNoFim.y).toBeGreaterThanOrEqual(faixaNoFim.y + faixaNoFim.height);
    await expect(contato(page)).toBeInViewport();
    const botao = (await contato(page).boundingBox())!;
    expect(botao.y).toBeGreaterThanOrEqual(faixaNoFim.height);
  });

  test(`${tela.nome}: depois do fim, a faixa some e o cabeçalho sobe para o topo`, async ({ page }) => {
    await page.setViewportSize(tela);
    await page.clock.install({ time: DEPOIS_DO_FIM });
    await abrir(page);
    await expect(page.locator('.faixa__barra')).toBeHidden();
    expect((await caixa(page, '.cabecalho')).y).toBe(0);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(200);
    expect((await caixa(page, '.cabecalho')).y).toBe(0);
    await expect(contato(page)).toBeInViewport();
  });
}

test('desktop: os links das seções no cabeçalho e nenhum botão Menu', async ({ page }) => {
  await pararNaOferta(page);
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Seções' }).getByRole('link')).toHaveText(['Incluso', 'Conceitos', 'Perguntas']);
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  await expect(page.locator('.faixa__contagem--desktop')).toHaveText('02d 12h 00m 00s');
});

test.describe('celular', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('o menu abre por cima, Tab percorre os links e Esc fecha devolvendo o foco', async ({ page }) => {
    await pararNaOferta(page);
    await abrir(page);
    await expect(page.locator('.faixa__contagem--celular')).toHaveText('02d 12h 00m');
    await expect(page.locator('.cabecalho__links')).toBeHidden();

    const menu = page.getByRole('button', { name: 'Menu' });
    const tamanho = (await menu.boundingBox())!;
    expect([tamanho.width, tamanho.height]).toEqual([44, 40]);
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    const topoDoConteudo = () => page.locator('main').evaluate((e) => e.getBoundingClientRect().top);
    const antes = await topoDoConteudo();

    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    const painel = page.locator('#menu-celular');
    await expect(painel).toBeVisible();
    // Por cima: o painel não empurra o conteúdo da página e fica abaixo do cabeçalho.
    expect(await topoDoConteudo()).toBe(antes);
    const cabecalho = await caixa(page, '.cabecalho');
    expect((await painel.boundingBox())!.y).toBeGreaterThanOrEqual(cabecalho.y + cabecalho.height - 1);

    for (const nome of ['Incluso', 'Conceitos', 'Perguntas']) {
      await page.keyboard.press('Tab');
      await expect(painel.getByRole('link', { name: nome })).toBeFocused();
    }
    await page.keyboard.press('Escape');
    await expect(painel).toBeHidden();
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(contato(page)).toBeVisible();
  });

  test('clicar em Perguntas fecha o menu e o título da seção fica abaixo da faixa e do cabeçalho', async ({ page }) => {
    await page.clock.install({ time: NA_OFERTA });
    await abrir(page);
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.locator('#menu-celular').getByRole('link', { name: 'Perguntas' }).click();
    await expect(page.locator('#menu-celular')).toBeHidden();
    await expect(page).toHaveURL(/#perguntas$/);
    await page.waitForTimeout(300);
    const faixa = await caixa(page, '.faixa__barra');
    const cabecalho = await caixa(page, '.cabecalho');
    const topo = await page.locator('#perguntas').evaluate((e) => e.getBoundingClientRect().top);
    expect(topo).toBeGreaterThanOrEqual(faixa.height + cabecalho.height - 1);
  });
});
