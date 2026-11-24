import { siteDoConceito, TEXTO_DOS_CONCEITOS } from '@/conteudo/conceitos';

type Props = { slug: string; nome: string; setor: string; tipo: string };

// Um cartão de conceito: o cartão inteiro é o link (o nome está no texto do link; a capa é decoração, alt="").
// Sem a capa (não carregou), fica o fundo da capa e o nome embaixo (R-06, casos de erro).
export function Cartao({ slug, nome, setor, tipo }: Props) {
  return (
    <a className="cartao" href={siteDoConceito(slug)} target="_blank" rel="noopener noreferrer">
      <span className="cartao__capa">
        {/* eslint-disable-next-line @next/next/no-img-element -- capa já em webp 730×1080, sem otimização de imagem no export estático */}
        <img src={`/conceitos/${slug}/capa.webp`} alt="" width={730} height={1080} loading="lazy" decoding="async" />
        <span className="cartao__selo">{TEXTO_DOS_CONCEITOS.seloDoCartao}</span>
        <span className="cartao__abrir">
          {TEXTO_DOS_CONCEITOS.abrir} <span aria-hidden="true">↗</span>
        </span>
      </span>
      <span className="cartao__nome">{nome}</span>
      <span className="cartao__meta">
        {setor} <span aria-hidden="true">·</span> {tipo}
      </span>
    </a>
  );
}
