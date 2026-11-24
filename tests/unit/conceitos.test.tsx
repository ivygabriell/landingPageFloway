import { render } from '@testing-library/react';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { Conceitos } from '@/secoes/conceitos';

const montar = () => render(<Conceitos />).container;
const texto = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim();

const ESPERADOS = [
  ['ferramenta-criativa', 'Ferramenta criativa', 'Tecnologia', 'Landing page'],
  ['companhia-aerea', 'Companhia aérea', 'Aviação', 'Site institucional'],
  ['banco-digital', 'Banco digital', 'Finanças', 'Landing page'],
  ['estudio-de-marca', 'Estúdio de marca', 'Design', 'Site institucional'],
  ['plataforma-de-deploy', 'Plataforma de deploy', 'Tecnologia', 'Landing page'],
];

test('selo da seção: "(03)" e "Conceitos"', () => {
  const secao = montar().querySelector('section#conceitos');
  expect(texto(secao?.querySelector('.conceitos__selo'))).toBe('(03) Conceitos');
});

test('título com "capazes" em <em> e apoio', () => {
  const c = montar();
  const h2 = c.querySelector('h2');
  expect(texto(h2)).toBe('Veja do que somos capazes.');
  expect(h2?.querySelector('em')?.textContent).toBe('capazes');
  expect(texto(c.querySelector('.conceitos__apoio'))).toBe(
    'Sites criados pela Floway para mostrar o nosso nível. O seu pode ser o próximo.',
  );
});

test('cinco cartões na ordem, cada um com selo "Conceito", link externo em aba nova, capa decorativa e o nome no link', () => {
  const cartoes = [...montar().querySelectorAll('a.cartao')];
  expect(cartoes).toHaveLength(5);
  cartoes.forEach((a, i) => {
    const [slug, nome, setor, tipo] = ESPERADOS[i];
    expect(a.getAttribute('href')).toBe(`https://flowayy.vercel.app/conceitos/${slug}/index.html`);
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    expect(texto(a.querySelector('.cartao__selo'))).toBe('Conceito');
    expect(texto(a.querySelector('.cartao__nome'))).toBe(nome);
    expect(texto(a.querySelector('.cartao__meta'))).toBe(`${setor} · ${tipo}`);
    const img = a.querySelector('img');
    expect(img?.getAttribute('src')).toBe(`/conceitos/${slug}/capa.webp`);
    expect(img?.getAttribute('alt')).toBe('');
    expect(img?.getAttribute('width')).toBe('730');
    expect(img?.getAttribute('height')).toBe('1080');
    expect(img?.getAttribute('loading')).toBe('lazy');
    expect(texto(a.querySelector('.cartao__abrir'))).toBe('Abrir o site ↗');
  });
});

test('botão "Quero um site assim →" leva ao destino do contato', () => {
  const botao = montar().querySelector('a.conceitos__botao');
  expect(texto(botao)).toBe('Quero um site assim →');
  expect(botao?.getAttribute('href')).toBe(DESTINO_DO_CONTATO);
});
