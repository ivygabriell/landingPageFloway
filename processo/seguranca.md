# Segurança

Mapa de riscos da Fase 2, no modo de orientação da `security-audit` (sem código ainda), feito pela Lead em 2026-11-23 para a leva 1 (`processo/specs/2026-11-23-leva-1.md`).

## Reconhecimento

- **Quem usa:** visitantes anônimos (a confiança mais baixa); a pessoa e as sessões do Claude Code, que publicam pelo repositório e pela hospedagem.
- **O que cada um pode fazer:** o visitante só lê a página e segue links; quem tem acesso ao repositório muda o que vai ao ar.
- **Fronteiras de confiança:**
  1. navegador do visitante ↔ página estática (nenhum dado volta ao servidor);
  2. página ↔ sites dos conceitos em outra origem (`flowayy.vercel.app`), abertos em aba nova;
  3. repositório público ↔ CI e hospedagem (quem escreve na `main` publica);
  4. dependências do npm ↔ build.
- **Superfícies de entrada:** nenhuma entrada de usuário na leva 1 (sem formulário, sem busca, sem parâmetros). O único dado externo é o relógio do aparelho, que só decide se a oferta aparece.
- **Domínios que se aplicam:** navegador (links externos, scripts de terceiros) e cadeia de suprimentos (npm, GitHub Actions). Não se aplicam: identidade, dados pessoais, API, nuvem, IA.

## Riscos e o critério de cada um

| Risco | Controle (vira critério de aceite nas issues) |
|---|---|
| Aba aberta pelo link do conceito controlar esta página (`window.opener`) | todo link externo com `target="_blank"` leva `rel="noopener noreferrer"`; teste sobre o HTML gerado |
| Dado pessoal ou segredo publicado (repositório público) | nenhum e-mail, telefone ou token no código, nos testes e nos commits; teste busca e-mail e telefone no HTML gerado; a higiene de dados do método roda antes de cada publicação |
| Página indexada antes da hora | `noindex, nofollow` e `robots.txt` bloqueando; teste sobre o HTML gerado; tirar é decisão da pessoa na publicação |
| Script de terceiros injetar código | nenhum script de terceiros na leva 1 (as fontes vêm do `next/font`, servidas pelo próprio site); um script novo de terceiros é decisão da Lead com revisão |
| Dependência comprometida | versões exatas no `package.json` (as mesmas do site oficial) e `package-lock.json` versionado; `npm ci` no CI; `npm audit --omit=dev` na validação |
| CI com permissões demais | o `ci.yml` já usa `permissions: contents: read`; nenhum segredo no CI na leva 1 |
| Relógio manipulado mostrar a oferta | risco aceito (R-12): sem efeito de segurança, a oferta é só texto |

## Notas das revisões

- **2026-11-23 · PR #17 (base), revisão do Security, modo de orientação: aprovar com notas.** `npm audit --omit=dev` acusa 4 altos e 1 moderado na contagem do npm. Pelo impacto demonstrado:
  - **baixo:** `@14islands/r3f-scroll-rig` 8.15.0 usa `query-string` 6.14.1 → `decode-uri-component` ≤ 0.5.0 (GHSA-vcc3-ghjq-m6fr, GHSA-qr28-fpjm-wq7f). Um link com uma query montada pode travar só a aba de quem clica, sem dado nem efeito que dure. A correção do npm é uma versão maior da lib (inviável no prazo). Fica como nota; um `override` com versão corrigida está "a validar". `?debug` liga o modo de depuração da lib, sem expor segredo (informativo).
  - **nota:** next 15.5.28 tem 3 avisos moderados (otimização de imagem, Edge runtime, servidor próprio) que não se aplicam a `output: 'export'` com `images.unoptimized`; o postcss interno só roda no build, sobre o nosso CSS. Mantidas as versões do site oficial (decisão da Lead).
  - **nota (só desenvolvimento):** vitest 3.2.7 e dependências têm avisos críticos; só rodam no teste e no CI, nunca no HTML.
  - **endurecimento para depois:** as actions do CI estão fixadas por tag (`@v4`), não por SHA.
- Regra para a validação: `npm audit --omit=dev` que falha é triado pelo impacto demonstrado (tabela da skill `metodo:auditoria-de-seguranca`); `confirmed` crítico ou alto bloqueia, o resto vira nota aqui.

## Auditorias

- Nenhuma ainda. Site estático sem login nem formulário: na Fase 7, a Lead propõe à pessoa o checklist e a busca de segredos no lugar da auditoria completa.
