import { RODAPE } from '@/conteudo/chamada-final';

// Rodapé (R-10, R-11): logo, descritor e direitos; sem e-mail nem telefone.
export function Rodape() {
  return (
    <footer className="rodape">
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG da marca, sem otimização de imagem no export estático */}
      <img className="rodape__logo" src="/marca/floway-assinatura-horizontal-fundo-claro.svg" alt="Floway" width={124} height={29} />
      <p className="rodape__descritor">{RODAPE.descritor}</p>
      <p className="rodape__direitos">{RODAPE.direitos}</p>
    </footer>
  );
}
