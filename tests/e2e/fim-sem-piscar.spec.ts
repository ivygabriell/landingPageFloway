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

test('depois do fim, a oferta fica escondida mesmo com um seletor de seção mais forte', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-28T00:00:01-03:00') });
  await page.goto('/');
  // Especificidade (0,3,3), maior que a da regra do fim (0,2,1): como o estilo de uma seção com várias classes.
  await page.addStyleTag({ content: 'html body p[data-oferta][data-oferta][data-oferta] { display: flex; }' });
  await expect(page.locator('html')).toHaveAttribute('data-oferta', 'encerrada');
  await page.evaluate(() => {
    const oferta = document.createElement('p');
    oferta.setAttribute('data-oferta', '');
    oferta.textContent = 'R$ 997';
    document.querySelector('main')!.append(oferta);
  });
  await expect(page.locator('p[data-oferta]')).toBeHidden();
});

test('na oferta, o que é do depois fica escondido mesmo com um seletor de seção mais forte', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-25T12:00:00-03:00') });
  await page.goto('/');
  await page.evaluate(() => {
    const depois = document.createElement('p');
    depois.setAttribute('data-sem-oferta', '');
    depois.textContent = 'Seu site novo.';
    document.querySelector('main')!.append(depois);
  });
  await page.addStyleTag({ content: 'html body p[data-sem-oferta][data-sem-oferta][data-sem-oferta] { display: flex; }' });
  await expect(page.locator('p[data-sem-oferta]')).toBeHidden();
});
