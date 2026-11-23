# Memória do projeto

A memória do projeto é o que a próxima sessão precisa saber para não recomeçar do zero. Guarde no mecanismo de memória do Claude Code ou em um `CLAUDE.md` na raiz. **Regra:** guarde o que não dá para descobrir lendo o código ou o histórico (decisões, preferências, pendências, lições), e nunca dados sensíveis.

## O que guardar

| Tipo | Exemplos |
|---|---|
| **Quem é a pessoa e como trabalha** | Idioma das respostas; quer o fluxo Superpowers; corrige por mensagens curtas, então confirme a interpretação com evidência antes de entregar |
| **Fluxo combinado** | Uma branch por mudança; enviar a branch antes de integrar; só a Lead integra; Skills em todo cenário; proteção da `main` ativa |
| **Decisões do projeto** | Público-alvo, estrutura aprovada, paleta, o que não pode mudar, o que ficou de fora e por quê |
| **Estado** | O que está integrado, o que está em andamento, o endereço do repositório, os comandos de teste |
| **Pendências** | Lista curta e viva, com a decisão que cada uma espera |
| **Lições** | Regras que vieram de um erro (por exemplo, "achar a seção pelo título exato") |
| **Tarefas e retrabalho** | Por tarefa: a issue, o especialista (no modo com especialistas), a ferramenta (Claude Code ou Codex), as passagens entre ferramentas, se houve retrabalho e por quê, e o consumo. É a medida dos modos na Fase 9 |
| **Referências** | Onde estão a spec, o plano, o painel de tarefas e a referência estudada |

## O que NÃO guardar

- E-mail, telefone, tokens, chaves e senhas.
- O que já está no código ou no histórico do Git (estrutura de arquivos, quem mudou o quê).
- Detalhes que só valem para a conversa de hoje.

## Gabarito

```markdown
---
name: nome-curto-do-projeto
description: uma linha que diga para que serve esta memória
type: project
---

Estado (AAAA-MM-DD): o que está integrado e onde (repositório, branch principal, comandos de teste).

Decisões da pessoa: ...

Pendências (em aberto):
- ...

#N · especialista · ferramenta · passagens · retrabalho · consumo (a Fase 9 compara as duas ferramentas).

Tarefas (issue · especialista · retrabalho · consumo):
- #N · back-e-dados · sem retrabalho · consumo da sessão

**Why:** por que esta memória existe.
**How to apply:** como usar nas próximas sessões.
```

Mantenha **uma linha por memória** no índice (`MEMORY.md`), com um gancho que diga quando ela é relevante, e atualize ou apague memórias que ficaram erradas.

## Estado do projeto

**2026-11-21 · Preparação (Lead, Claude Code)**

- **O que é:** uma landing page nova da Floway, num repositório próprio (`ivygabriell/landingPageFloway`, público). Cenário `site-estatico`, método 7.0.0, Claude Code e Codex pela tabela Ferramenta por papel (escolha da pessoa; substituída em 2026-11-22 por só o Claude Code).
- **Decisões da pessoa:** a landing **não** parte da `landing-floway` que existe em `ivygabriell/sitesFlowway` (`apps/site/public/conceitos/landing-floway/`); é outra. Do site oficial vêm a identidade e as regras da marca. Commits com o e-mail `noreply` do GitHub (configurado só neste repositório).
- **Referências:** site oficial `ivygabriell/sitesFlowway` (Next.js 15.5, método 6.0.0); identidade em `CreateHubAI/identidadeFloway` (só leitura: paleta `#F7F7F5` `#DCDCD8` `#787878` `#121212`, azul `#002FA7`/`#5B7BFF` só em detalhes; Inter Tight, Azeret Mono, Instrument Serif; logo só pelos arquivos de `assets/brand/`). Regras da marca no site oficial: nada inventado (cliente, número, depoimento), trabalho sem cliente leva "Conceito", sem e-mail ou telefone na página, `noindex` até publicar, publicar é decisão da pessoa.
- **Onde parou:** estrutura do método criada; próxima fase é a 0 (descobrir a intenção) com `superpowers:brainstorming`.

**2026-11-22 · Fase 0 e requisitos (Lead, Claude Code)**

- **Entendimento confirmado:** a landing vende **sites e landing pages sob medida**, para empresas de qualquer setor (sem nicho); objetivo principal é vender; reforça a identidade com animações extravagantes e inovação, e a própria página é a prova do produto.
- **Decisões da pessoa:** desenho no **Penpot** (no lugar do Figma do método); estrutura de nove seções aprovada ("pode seguir"), descrita em `processo/requisitos.md` (R-01 a R-11); a pessoa aprova e valida seção por seção. **Formulário fora por enquanto:** a pessoa está alterando o formulário da Floway; o destino do botão final fica em aberto.
- **Referências:** a pessoa não indicou outras; a Lead usa o site oficial e a identidade como referência (chamada da Lead, a conferir).
- **Penpot:** servidor MCP copiado do projeto do site oficial para o escopo local deste projeto (fora do repositório); as ferramentas só carregam numa sessão nova.

**2026-11-22 · Hero aprovado (Lead, Claude Code)**

- **Aprovado pela pessoa:** hero com cabeçalho (R-01, R-02), celular e desktop, registrados em `processo/telas/` com os tokens do Penpot. Desenho feito pela Lead no Penpot via MCP (servidor do projeto, chamado por HTTP porque as ferramentas não carregaram nesta sessão).
- **Pedido novo da pessoa:** garantir o **senso de urgência da Black Friday**. Muda o que será construído; falta a pessoa dizer a oferta real (o que, quanto, até quando), porque nada pode ser inventado.
- **Atenção:** o arquivo `New File 4` do Penpot também tem, na página 1, um desenho do site oficial; não foi tocado.

**2026-11-22 · Black Friday (Lead, Claude Code)**

- **Oferta da pessoa:** site por **R$ 997**, entregue em **até 3 dias**, para projetos fechados até **27/11/2026 às 23h59**. Na página: faixa de urgência fixa com contagem regressiva real, selo e linha de condição no hero (aprovado em 2026-11-22). Ao zerar, faixa e selo somem e o hero volta à versão aprovada sem a oferta.
- **Prazo:** a página precisa estar no ar antes de 27/11. A pessoa aprovou a **versão enxuta** (hero, incluso, conceitos, perguntas, chamada final); dor, virada, processo e "por que a Floway" ficam para a segunda leva.
- **Ferramenta (2026-11-22):** a pessoa decidiu "não utilize o codex, somente o claude". Todos os papéis no Claude Code; a revisão cruzada vira revisão com contexto limpo por outra sessão do Claude Code no Orca. A revisão do Codex dos PRs #1 e #2 tinha parado no limite de uso do Codex e foi encerrada (`worker-stop`).
- **Onde parou (2026-11-22):** PR #1 (requisitos R-01 a R-12, leva 1, só Claude Code) integrado; hero e hero Black Friday registrados neste PR; seção Incluso (R-05) desenhada no Penpot, esperando aprovação e a resposta da pessoa sobre o que os R$ 997 cobrem, quando começam os 3 dias e o destino do botão.

**2026-11-22 · Incluso e oferta (Lead, Claude Code)**

- **Decisões da pessoa:** oferta "de R$ 4.997 por R$ 997" (R$ 4.997 é o preço real cobrado hoje); o R$ 997 vale para um site do tipo que o cliente quiser; os 3 dias contam a partir do fechamento do material com o cliente; os botões esperam o formulário da Floway (sem WhatsApp como alternativa); menu da leva 1 só com Incluso, Conceitos e Perguntas. Seção Incluso (R-05) aprovada, mais agressiva, como o único trecho escuro.
- **Onde parou:** Incluso e hero revistos registrados; próximo desenho é Conceitos (R-06), com as 5 peças do site oficial.

**2026-11-23 · Conceitos aprovados (Lead, Claude Code)**

- **Aprovado pela pessoa:** Conceitos (R-06) com as cinco peças do site oficial. Decisões: não citar clientes fictícios no texto; sem indicador de progresso na galeria (a pessoa tirou a barra e depois o F que se preenchia, direto no Penpot). O selo "Conceito" continua nos cartões (regra da marca), sem objeção da pessoa até aqui.
- **Pendências da pessoa:** destino do clique nos conceitos; tirar ou manter "Medição" e "Animação e 3D" na faixa de benefícios do hero.
- **Onde parou:** Conceitos registrados; próximos desenhos: Perguntas (R-09) e Chamada final (R-10).

**2026-11-23 · Perguntas aprovadas (Lead, Claude Code)**

- **Decisões da pessoa:** Perguntas (R-09) aprovadas com as cinco respostas; o clique nos conceitos abre os sites dos conceitos como no site oficial; "Medição" e "Animação e 3D" saem da faixa de benefícios do hero; as capas dos conceitos ficam como estão.
- **Onde parou:** falta desenhar a Chamada final (R-10); depois, spec e plano para construir a leva 1 antes de 27/11.
- **Pendência da pessoa:** o que a página diz depois de 27/11 23h59 (respostas sem a oferta para as perguntas 1 a 3, título da chamada final, Incluso sem preço). Até lá, a Lead decidiu esconder no navegador e tirar na publicação de 28/11.

**2026-11-23 · Chamada final aprovada (Lead, Claude Code)**

- **Aprovado pela pessoa ("aprovado pode seguir"):** Chamada final (R-10) com a esfera de partículas que forma o F, a condição da oferta, a contagem e o rodapé (logo, descritor, © 2026, sem e-mail nem telefone). Depois do fim da oferta, o título fica "Seu site novo.".
- **Todas as telas da leva 1 estão aprovadas e registradas** (hero, hero Black Friday, Incluso, Conceitos, Perguntas, Chamada final).
- **Onde parou:** próxima fase é a spec e o plano para construir a leva 1 antes de 27/11 (`superpowers:writing-plans`). Pendências da pessoa: destino dos botões (formulário da Floway) e o texto do depois de 27/11.


**2026-11-23 · Spec da leva 1 (Lead, Claude Code)**

- **Decisão da pessoa:** construir com a mesma base do site oficial (Next.js estático, React, three.js, efeitos copiados e adaptados de `sitesFlowway`), "1. pode seguir".
- **Spec aprovada pela pessoa** (`processo/specs/2026-11-23-leva-1.md`, "aprovado"), com o mapa de riscos em `processo/seguranca.md` e as chamadas da Lead: cortes do Incluso depois do fim da oferta; destino provisório `#comecar` que bloqueia a publicação.
- **Onde parou:** plano em `processo/planos/2026-11-23-leva-1.md` (8 tarefas; a 1 sozinha, 2 a 7 em paralelo, a 8 no fim), esperando a aprovação da pessoa e a escolha do modo de execução.
