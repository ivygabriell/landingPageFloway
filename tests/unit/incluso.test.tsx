import { render } from '@testing-library/react';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { Incluso } from '@/secoes/incluso';

afterEach(() => vi.useRealTimers());

const montar = () => render(<Incluso />).container;
const texto = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim();

test('selo da seção: "(02)" e "O que está incluso"', () => {
  const secao = montar().querySelector('section#incluso');
  expect(texto(secao?.querySelector('.incluso__selo'))).toBe('(02) O que está incluso');
});

test('selo Black Friday, dentro de [data-oferta]', () => {
  const selo = montar().querySelector('.incluso__black-friday');
  expect(texto(selo)).toBe('Black Friday · só até 27/11');
  expect(selo?.closest('[data-oferta]')).not.toBeNull();
});

test('bloco de preço: "De R$ 4.997" inteiro riscado, −80%, por, R$ 997, dentro de [data-oferta]', () => {
  const preco = montar().querySelector('.incluso__preco');
  expect(preco?.closest('[data-oferta]')).not.toBeNull();
  expect(preco?.querySelector('s')?.textContent).toBe('De R$ 4.997');
  expect(texto(preco?.querySelector('.incluso__desconto'))).toBe('−80%');
  expect(texto(preco?.querySelector('.incluso__por'))).toBe('por');
  // As cópias do glitch são decoração (aria-hidden); o leitor de tela lê o preço uma vez só.
  const valor = preco?.querySelector('.incluso__valor');
  const lido = [...(valor?.childNodes ?? [])].filter((n) => !(n instanceof Element && n.getAttribute('aria-hidden') === 'true'));
  expect(lido.map((n) => n.textContent).join('')).toBe('R$ 997');
});

test('título com "você quer" em <em> e "Em até 3 dias." em [data-oferta]', () => {
  const h2 = montar().querySelector('h2');
  expect(texto(h2)).toBe('Um site completo. Do jeito que você quer. Em até 3 dias.');
  expect(h2?.querySelector('em')?.textContent).toBe('você quer');
  expect(texto(h2?.querySelector('[data-oferta]'))).toBe('Em até 3 dias.');
});

test('apoio', () => {
  expect(texto(montar().querySelector('.incluso__apoio'))).toBe(
    'Landing page, site institucional ou o que o seu negócio precisar. Você diz o que quer; a gente entrega pronto, no ar.',
  );
});

test('contagem: rótulo e quatro caixas (dias, horas, min, seg) com o tempo que falta, em [data-oferta]', () => {
  vi.useFakeTimers({ now: new Date('2026-11-23T16:47:24-03:00') });
  const contagem = montar().querySelector('.incluso__contagem');
  expect(contagem?.closest('[data-oferta]')).not.toBeNull();
  expect(texto(contagem?.querySelector('.incluso__rotulo'))).toBe('A condição termina em');
  const caixas = [...(contagem?.querySelectorAll('.incluso__caixa') ?? [])].map(texto);
  expect(caixas).toEqual(['04 dias', '07 horas', '12 min', '36 seg']);
});

test('lista "Tudo isso por R$ 997" com os seis itens na ordem, cada um com até 8 palavras', () => {
  const c = montar();
  const titulo = c.querySelector('.incluso__lista-titulo');
  expect(texto(titulo)).toBe('Tudo isso por R$ 997');
  expect(texto(titulo?.querySelector('[data-oferta]'))).toBe('por R$ 997');
  const itens = [...c.querySelectorAll('.incluso__lista li')].map(texto);
  expect(itens).toEqual([
    'Estrutura pensada para vender',
    'Texto que convence',
    'Design sob medida, celular e computador',
    'Animações com a assinatura Floway',
    'Rápido e pronto para o Google',
    'Botão, formulário e WhatsApp funcionando',
  ]);
  for (const item of itens) expect(item!.split(' ').length).toBeLessThanOrEqual(8);
});

test('botão "Quero meu site por R$ 997 →" para o destino do contato, em [data-oferta]', () => {
  const botao = montar().querySelector('a.incluso__botao');
  expect(texto(botao)).toBe('Quero meu site por R$ 997 →');
  expect(botao?.getAttribute('href')).toBe(DESTINO_DO_CONTATO);
  expect(botao?.closest('[data-oferta]')).not.toBeNull();
});

test('condição, em [data-oferta]', () => {
  const condicao = montar().querySelector('.incluso__condicao');
  expect(texto(condicao)).toBe(
    'Para projetos fechados até 27/11 às 23h59. Os 3 dias contam a partir do fechamento do material com você.',
  );
  expect(condicao?.closest('[data-oferta]')).not.toBeNull();
});

test('nenhum termo técnico sem explicação: SEO, WebGL, 3D, CRM, conversão', () => {
  expect(montar().textContent).not.toMatch(/SEO|WebGL|3D|CRM|convers[ãa]o/i);
});

test('depois do fim: sem selo, preço, contagem, botão nem condição; título e lista cortados', () => {
  vi.stubEnv('OFERTA_AGORA', '2026-11-28T03:00:00Z');
  const c = montar();
  for (const classe of ['black-friday', 'preco', 'contagem', 'botao', 'condicao'])
    expect(c.querySelector(`.incluso__${classe}`)).toBeNull();
  expect(texto(c.querySelector('h2'))).toBe('Um site completo. Do jeito que você quer.');
  expect(texto(c.querySelector('.incluso__lista-titulo'))).toBe('Tudo isso');
  expect(c.querySelectorAll('.incluso__lista li')).toHaveLength(6);
});
