import { LINKS_DO_CABECALHO, TEXTO_DO_CONTATO } from '@/conteudo/cabecalho';
import { DESTINO_DO_CONTATO } from '@/conteudo/contato';
import { Menu } from './Menu';
import './estilo.css';

// Cabeçalho preso logo abaixo da faixa (R-02): logo, links das seções e o botão de contato sempre visível.
// Os links do desktop e os do menu do celular são duas listas; o CSS mostra uma de cada vez.
export function Cabecalho() {
  return (
    <header className="cabecalho">
      <a className="cabecalho__logo" href="#topo">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG da marca, sem otimização de imagem no export estático */}
        <img src="/marca/floway-assinatura-horizontal-fundo-claro.svg" alt="Floway" width={124} height={29} />
      </a>
      <nav className="cabecalho__links" aria-label="Seções">
        <ul>
          {LINKS_DO_CABECALHO.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.texto}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="cabecalho__contato" href={DESTINO_DO_CONTATO}>
        {TEXTO_DO_CONTATO} <span aria-hidden="true">→</span>
      </a>
      <Menu />
    </header>
  );
}
