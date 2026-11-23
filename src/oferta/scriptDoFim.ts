import { FIM_DA_OFERTA } from './relogio';

// Roda no <head>, antes da primeira pintura: se o relógio do visitante já passou do fim, o CSS esconde a oferta
// antes de ela aparecer (HTML antigo em cache, aba aberta antes do fim).
export const scriptDoFim = `if(Date.now()>=Date.parse(${JSON.stringify(FIM_DA_OFERTA.toISOString())}))document.documentElement.dataset.oferta='encerrada';`;
