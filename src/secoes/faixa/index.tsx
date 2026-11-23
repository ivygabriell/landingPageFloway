import { Contagem } from '@/oferta/Contagem';
import { SoNaOferta } from '@/oferta/Oferta';

// Faixa vazia da base (Tarefa 1): já é da oferta e tem a contagem, para os testes do fim; a Tarefa 2 constrói o resto.
export function FaixaDeUrgencia() {
  return (
    <SoNaOferta>
      <Contagem formato="longa" />
    </SoNaOferta>
  );
}
