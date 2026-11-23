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
