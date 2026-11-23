// O relógio da Black Friday (R-12). Só milissegundos UTC: o fuso do aparelho não muda o fim nem a contagem.

// 28/11/2026 00h00min00s em UTC−3: a oferta vale até 27/11 às 23h59min59s.
export const FIM_DA_OFERTA = new Date('2026-11-28T03:00:00Z');

export type Restante = { dias: number; horas: number; minutos: number; segundos: number };

const SEGUNDO = 1000;
const MINUTO = 60 * SEGUNDO;

const falta = (agora: Date) => FIM_DA_OFERTA.getTime() - agora.getTime();

// Arredonda para cima: a contagem nunca mostra zero enquanto a oferta vale.
function partes(totalDeSegundos: number): Restante {
  return {
    dias: Math.floor(totalDeSegundos / 86400),
    horas: Math.floor((totalDeSegundos % 86400) / 3600),
    minutos: Math.floor((totalDeSegundos % 3600) / 60),
    segundos: totalDeSegundos % 60,
  };
}

export function estadoDaOferta(agora: Date): { ativa: true; restante: Restante } | { ativa: false } {
  const ms = falta(agora);
  if (ms <= 0) return { ativa: false };
  return { ativa: true, restante: partes(Math.ceil(ms / SEGUNDO)) };
}

const doisDigitos = (n: number) => String(n).padStart(2, '0');

// Celular: dias, horas e minutos, com os minutos arredondados para cima ("00d 00h 02m").
export function contagemCurta(agora: Date): string {
  const { dias, horas, minutos } = partes(Math.max(0, Math.ceil(falta(agora) / MINUTO)) * 60);
  return `${doisDigitos(dias)}d ${doisDigitos(horas)}h ${doisDigitos(minutos)}m`;
}

// Desktop e chamada final: com os segundos ("00d 00h 01m 30s").
export function contagemLonga(agora: Date): string {
  const { dias, horas, minutos, segundos } = partes(Math.max(0, Math.ceil(falta(agora) / SEGUNDO)));
  return `${doisDigitos(dias)}d ${doisDigitos(horas)}h ${doisDigitos(minutos)}m ${doisDigitos(segundos)}s`;
}

// O instante do build: OFERTA_AGORA (ISO) simula outro momento. Só do servidor (ver src/oferta/Oferta.tsx).
function agoraDoBuild(): Date {
  const valor = process.env.OFERTA_AGORA;
  if (!valor) return new Date();
  const agora = new Date(valor);
  if (Number.isNaN(agora.getTime())) throw new Error(`OFERTA_AGORA inválido: "${valor}" (use uma data ISO, como 2026-11-25T15:00:00Z)`);
  return agora;
}

export const ofertaNoBuild = (): boolean => agoraDoBuild() < FIM_DA_OFERTA;
