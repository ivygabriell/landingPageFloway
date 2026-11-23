// Roda no <head>, antes da primeira pintura: se o relógio do visitante já passou do fim, o CSS esconde a oferta
// antes de ela aparecer (HTML antigo em cache, aba aberta antes do fim).
// A data em ISO, a mesma de FIM_DA_OFERTA (o teste unitário confere os dois lados do fim), e não em milissegundos.
export const scriptDoFim = "if(Date.now()>=Date.parse('2026-11-28T03:00:00Z'))document.documentElement.dataset.oferta='encerrada';";
