'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { LINKS_DO_CABECALHO } from '@/conteudo/cabecalho';

// Menu do celular (R-02): o botão abre os links por cima; Esc fecha e devolve o foco ao botão; o clique num link fecha.
// O botão de contato fica fora daqui, sempre à mão no cabeçalho.
export function Menu() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);

  const aoTeclar = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !aberto) return;
    setAberto(false);
    botao.current?.focus();
  };

  return (
    <div className="menu" onKeyDown={aoTeclar}>
      <button
        ref={botao}
        type="button"
        className="menu__botao"
        aria-expanded={aberto}
        aria-controls="menu-celular"
        aria-label="Menu"
        onClick={() => setAberto((a) => !a)}
      >
        <span className="menu__tracos" />
      </button>
      <nav id="menu-celular" className="menu__painel" aria-label="Seções" hidden={!aberto}>
        <ul>
          {LINKS_DO_CABECALHO.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setAberto(false)}>
                {l.texto}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
