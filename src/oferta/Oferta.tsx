import type { ReactNode } from 'react';
import { ofertaNoBuild } from './relogio';

type Tag = 'div' | 'span' | 'p' | 'li';
type Props = { as?: Tag; children: ReactNode };

// Só do servidor: sem 'use client' e nunca importado por um componente cliente (no navegador não há OFERTA_AGORA
// e a hidratação daria erro depois do fim). O cliente recebe as partes da oferta já envolvidas, como children ou props.

// O que é da oferta: sai do HTML num build depois do fim e, no navegador, o CSS esconde quando
// <html data-oferta="encerrada"> (app/globals.css).
export function SoNaOferta({ as: Tag = 'div', children }: Props) {
  if (!ofertaNoBuild()) return null;
  return <Tag data-oferta="">{children}</Tag>;
}

// O que fica no lugar depois do fim: sempre no HTML, escondido pelo CSS enquanto a oferta vale.
export function SemOferta({ as: Tag = 'div', children }: Props) {
  return <Tag data-sem-oferta="">{children}</Tag>;
}
