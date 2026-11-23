import { Azeret_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google';

// As três famílias da marca (tokens fonte.sans, fonte.mono e fonte.serif), em --fonte-sans, --fonte-mono e --fonte-serif.
const sans = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--fonte-sans' });
const mono = Azeret_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--fonte-mono' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'], variable: '--fonte-serif' });

export const classesDasFontes = `${sans.variable} ${mono.variable} ${serif.variable}`;
