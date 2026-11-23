import localFont from 'next/font/local';

// As três famílias da marca (tokens fonte.sans, fonte.mono e fonte.serif), em --fonte-sans, --fonte-mono e --fonte-serif.
// Locais (woff2 latin do Fontsource, licença OFL ao lado): o next/font/google quebrava o build no CI quando o Google
// devolvia URL de fonte sem extensão. O next/font/local só aceita literais, por isso a lista escrita à mão.
const sans = localFont({
  src: [
    { path: './fontes/inter-tight/inter-tight-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fontes/inter-tight/inter-tight-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fontes/inter-tight/inter-tight-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fontes/inter-tight/inter-tight-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: './fontes/inter-tight/inter-tight-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--fonte-sans',
  display: 'swap',
});

const mono = localFont({
  src: [
    { path: './fontes/azeret-mono/azeret-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fontes/azeret-mono/azeret-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fontes/azeret-mono/azeret-mono-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--fonte-mono',
  display: 'swap',
});

const serif = localFont({
  src: [
    { path: './fontes/instrument-serif/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fontes/instrument-serif/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--fonte-serif',
  display: 'swap',
});

export const classesDasFontes = `${sans.variable} ${mono.variable} ${serif.variable}`;
