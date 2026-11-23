import { expect, test } from '@playwright/test';

// Foco 2 da revisão: a contagem chega a zero com a página aberta; a oferta some na hora, sem zero parado.
test('a oferta some quando a contagem chega ao fim', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-27T23:59:57-03:00') });
  await page.clock.pauseAt(new Date('2026-11-27T23:59:58-03:00'));
  await page.goto('/');

  const oferta = page.locator('body [data-oferta]').first();
  await expect(oferta).toBeVisible();
  await expect(oferta).toContainText('00d 00h 00m 02s');
  await expect(page.locator('html')).not.toHaveAttribute('data-oferta', 'encerrada');

  await page.clock.runFor(3000);
  await expect(page.locator('html')).toHaveAttribute('data-oferta', 'encerrada');
  for (const el of await page.locator('body [data-oferta]').all()) await expect(el).toBeHidden();
  await expect(page.locator('body')).not.toContainText('00d 00h 00m 00s');
});
