import { CarregarCanvas } from '@/canvas/CarregarCanvas';
import { Cabecalho } from '@/secoes/cabecalho';
import { ChamadaFinal } from '@/secoes/chamada-final';
import { Conceitos } from '@/secoes/conceitos';
import { FaixaDeUrgencia } from '@/secoes/faixa';
import { Hero } from '@/secoes/hero';
import { Incluso } from '@/secoes/incluso';
import { Perguntas } from '@/secoes/perguntas';

// A página única da leva 1. Cada seção mora na sua pasta (src/secoes/) e é construída por uma tarefa própria.
export default function Pagina() {
  return (
    <>
      <FaixaDeUrgencia />
      <Cabecalho />
      <main>
        <Hero />
        <Incluso />
        <Conceitos />
        <Perguntas />
        <ChamadaFinal />
      </main>
      <CarregarCanvas />
    </>
  );
}
