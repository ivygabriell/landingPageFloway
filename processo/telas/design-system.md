# Design system

Catálogo do que existe no Penpot (conjunto de tokens `Floway`, cores da biblioteca local `Floway/*`). Fonte da identidade: `CreateHubAI/identidadeFloway` (só leitura). Atualizado a cada aprovação.

## Tokens

- **Cor:** `cor.claro` #F7F7F5 (fundo), `cor.cinza-claro` #DCDCD8 (linhas), `cor.cinza-medio` #787878 (só texto ≥ 24 px e linhas), `cor.preto` #121212 (texto), `cor.azul` #002FA7 (só detalhes), `cor.azul-no-escuro` #5B7BFF, `cor.papel` #FFFFFF (vidro e papel; na identidade, o branco é "só papel", spec do site oficial). Semânticos: `cor.fundo`, `cor.texto`, `cor.detalhe`.
- **Fonte:** `fonte.sans` Inter Tight, `fonte.mono` Azeret Mono, `fonte.serif` Instrument Serif.
- **Espaço:** `espaco.1` a `espaco.7` (4, 8, 16, 24, 40, 64, 104). **Raio:** `raio.botao` 999, `raio.cartao` 12.

## Peças (aprovadas com o hero, 2026-11-22)

| Peça | Variantes | Estados | Medidas |
|---|---|---|---|
| Botão principal | escuro (preto, texto claro) | padrão; foco e hover a definir na construção | celular 40 (cabeçalho) e 56 de altura; Inter Tight 500 14–17 |
| Link secundário | sublinhado | padrão | Inter Tight 500 15–16 |
| Botão Menu (celular) | contorno preto, dois traços | fechado | 44×40 |
| Selo | ponto azul + `(NN)` + rótulo | — | Azeret Mono 500 11–12, caixa-alta, espaçamento 0,6 |
| Palavra FLOWAY | cópia azul (glitch), fatias deslocadas | entrada, rolagem, reduzido (estática) | Inter Tight 800, caixa-alta, espaçamento −0,055 em, largura das margens |
| Lâmina de vidro | — | inclinada −8°, desfoque de fundo 6–10, papel 16 %, contorno papel 90 % | celular 74×200, desktop 168×380 |
| Faixa de benefícios | — | rolando; parada no reduzido | 52 de altura, linha `cor.cinza-claro` no topo, Azeret Mono 11 |
| Faixa de urgência | celular (oferta curta + dias, horas, minutos), desktop (oferta completa + segundos) | contando; some ao zerar | 36/40 de altura, `cor.preto`, Azeret Mono 10–11 `cor.claro`, ponto `cor.azul-no-escuro` |
| Selo Black Friday | celular: "(01) [Black Friday] Sites sob medida" (texto curto por espaço); desktop: texto inteiro | só durante a oferta | pílula `cor.azul`, Azeret Mono 700 11 `cor.papel`, 22 de altura |
| Trecho escuro (Incluso) | — | único trecho escuro da landing | fundo `cor.preto`, texto `cor.claro`, apoio `cor.cinza-claro`, detalhe `cor.azul-no-escuro`, linhas #3A3A3A |
| Preço com âncora | "De R$ 4.997" riscado + selo "−80%" (`cor.azul-no-escuro`, texto `cor.preto`) + "por" (Instrument Serif itálico) | só durante a oferta | Inter Tight 500 28/40; preço Inter Tight 800 com o glitch da palavra FLOWAY |
| Contagem em caixas | dias, horas, min, seg | contando; some no fim da oferta | 4 caixas com contorno #3A3A3A, raio 10, número Inter Tight 700 34/52 |
| Lista com ✓ | — | os itens se marcam um depois do outro ao rolar | ✓ `cor.azul-no-escuro`, Inter Tight 500 18–21, linhas #3A3A3A |
| Botão claro | sobre o escuro (`cor.claro`, texto `cor.preto`) | padrão; hover cresce 2 % | 60/68 de altura |
| Cartão de conceito | capa 730×1080 com raio 12; hover com sombra e "Abrir o site ↗" | padrão, hover/foco | selo "Conceito" (contorno `cor.preto`, Azeret Mono 10), nome Inter Tight 600 20–22, setor · tipo Azeret Mono 11 |
| Botão contorno | "Quero um site assim →" | padrão | contorno `cor.preto`, 52/60 de altura |
| Pergunta (acordeão) | aberta (− e traço azul de 48 sob a pergunta) e fechada (+) | uma aberta por vez | número Azeret Mono 11, pergunta Inter Tight 500 19/24, resposta Inter Tight 400 16/18, linhas `cor.cinza-claro` |
| Esfera de partículas | partículas `cor.preto`/`cor.cinza-medio` com algumas `cor.azul-no-escuro`, formando o F `cor.azul` | girando; formando o F (1,2 s) ao entrar; cursor empurra (desktop); parada no reduzido e sem WebGL | quadro celular 340×340, desktop 540×540 |
| Contagem em linha | "04d 07h 12m 36s" com o rótulo "A condição termina em" | contando; some no fim da oferta | rótulo Azeret Mono 500 11 caixa-alta, número Azeret Mono 700 22 (celular) e 28 (desktop) |
| Rodapé | logo de `assets/brand/`, descritor "Sites, landing pages e automações", "© 2026 Floway" | — | linha `cor.cinza-claro` no topo, logo 124×29, descritor Inter Tight 400 14, © Azeret Mono 500 11; sem e-mail nem telefone |
