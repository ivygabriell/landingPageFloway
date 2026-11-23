// Textos do hero (R-01) e da oferta no hero (R-12, "Textos exatos"). O título e o apoio vêm da captura registrada.
export const HERO = {
  numero: '(01)',
  selo: 'Sites e landing pages sob medida',
  seloCurto: 'Sites sob medida',
  pilula: 'Black Friday',
  titulo: { antes: 'Sites que ', destaque: 'vendem', depois: '.', segunda: 'E que ninguém esquece.' },
  apoio: 'Estratégia, texto, design e animação no mesmo time. Do primeiro rascunho ao site no ar, feito para transformar visita em cliente.',
  botao: 'Iniciar um projeto',
  link: 'Ver como funciona',
  beneficios: ['Estratégia', 'Texto que vende', 'Design sob medida', 'Site rápido'],
  // O preço antigo vai riscado (<s>) entre o antes e o depois.
  condicao: {
    desktop: { antes: 'De ', riscado: 'R$ 4.997', depois: ' por R$ 997 · entrega em até 3 dias · até 27/11 às 23h59.' },
    celular: { antes: 'Site de ', riscado: 'R$ 4.997', depois: ' por R$ 997, entregue em até 3 dias, para projetos fechados até 27/11 às 23h59.' },
  },
} as const;
