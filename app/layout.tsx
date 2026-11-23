import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@14islands/r3f-scroll-rig/css';
import './globals.css';
import { classesDasFontes } from '@/fontes';
import { ofertaNoBuild } from '@/oferta/relogio';
import { scriptDoFim } from '@/oferta/scriptDoFim';

// Fora dos buscadores até a pessoa decidir publicar (R-11).
export const metadata: Metadata = {
  title: 'Floway · Sites e landing pages sob medida',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    // O script do head e os modos (src/lib/webgl.ts) mexem no <html> antes da hidratação.
    <html lang="pt-BR" className={classesDasFontes} data-oferta={ofertaNoBuild() ? undefined : 'encerrada'} suppressHydrationWarning>
      <head>
        {/* Antes de pintar: depois do fim, a oferta não aparece nem por um quadro. */}
        <script dangerouslySetInnerHTML={{ __html: scriptDoFim }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
