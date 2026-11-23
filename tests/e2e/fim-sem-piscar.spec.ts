import { expect, test } from '@playwright/test';

// Foco 1 da revisão: o HTML ainda tem a oferta (build antes do fim), mas o visitante abre depois do fim.
// Nada da oferta pode aparecer, nem por um quadro. Fuso de Lisboa: o fim é o mesmo instante (foco 5).
test.use({ timezoneId: 'Europe/Lisbon' });

test('depois do fim, nenhum quadro mostra a oferta', async ({ page }) => {
  // Antes do relógio falso: o requestAnimationFrame guardado é o do navegador, que só roda quando a página vai pintar
  // (com as folhas de estilo carregadas). Conta como visto qualquer [data-oferta] visível no quadro
  // (checkVisibility: offsetParent é sempre null num elemento fixo, como a faixa).
  await page.addInitScript(() => {
    const w = window as unknown as { __quadros: number; __viuOferta: boolean };
    const quadro = window.requestAnimationFrame.bind(window);
    w.__quadros = 0;
    w.__viuOferta = false;
    const olhar = () => {
      w.__quadros++;
      for (const el of document.querySelectorAll('body [data-oferta]')) if (el.checkVisibility()) w.__viuOferta = true;
      quadro(olhar);
    };
    quadro(olhar);
  });
  await page.clock.install({ time: new Date('2026-11-28T00:00:01-03:00') });
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-oferta', 'encerrada');
  // O HTML gerado antes do fim traz a oferta: é ela que não pode aparecer.
  expect(await page.locator('body [data-oferta]').count()).toBeGreaterThan(0);
  await page.waitForTimeout(1000);
  const { quadros, viu } = await page.evaluate(() => {
    const w = window as unknown as { __quadros: number; __viuOferta: boolean };
    return { quadros: w.__quadros, viu: w.__viuOferta };
  });
  expect(quadros).toBeGreaterThan(5);
  expect(viu).toBe(false);
});
