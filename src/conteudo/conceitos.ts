// Textos exatos de Conceitos (R-06) e da captura aprovada. A caixa-alta vem do CSS.
// Os cinco conceitos do site oficial, na ordem da captura; o clique abre o site do conceito numa aba nova.
export const CONCEITOS: { slug: string; nome: string; setor: string; tipo: string }[] = [
  { slug: 'ferramenta-criativa', nome: 'Ferramenta criativa', setor: 'Tecnologia', tipo: 'Landing page' },
  { slug: 'companhia-aerea', nome: 'Companhia aérea', setor: 'Aviação', tipo: 'Site institucional' },
  { slug: 'banco-digital', nome: 'Banco digital', setor: 'Finanças', tipo: 'Landing page' },
  { slug: 'estudio-de-marca', nome: 'Estúdio de marca', setor: 'Design', tipo: 'Site institucional' },
  { slug: 'plataforma-de-deploy', nome: 'Plataforma de deploy', setor: 'Tecnologia', tipo: 'Landing page' },
];

export const siteDoConceito = (slug: string) => `https://flowayy.vercel.app/conceitos/${slug}/index.html`;

export const TEXTO_DOS_CONCEITOS = {
  numero: '(03)',
  selo: 'Conceitos',
  titulo: { antes: 'Veja do que somos ', enfase: 'capazes', depois: '.' },
  apoio: 'Sites criados pela Floway para mostrar o nosso nível. O seu pode ser o próximo.',
  seloDoCartao: 'Conceito',
  abrir: 'Abrir o site',
  botao: 'Quero um site assim',
};
