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

- **O que é:** uma landing page nova da Floway, num repositório próprio (`ivygabriell/landingPageFloway`, público). Cenário `site-estatico`, método 7.0.0, Claude Code e Codex pela tabela Ferramenta por papel (escolha da pessoa).
- **Decisões da pessoa:** a landing **não** parte da `landing-floway` que existe em `ivygabriell/sitesFlowway` (`apps/site/public/conceitos/landing-floway/`); é outra. Do site oficial vêm a identidade e as regras da marca. Commits com o e-mail `noreply` do GitHub (configurado só neste repositório).
- **Referências:** site oficial `ivygabriell/sitesFlowway` (Next.js 15.5, método 6.0.0); identidade em `CreateHubAI/identidadeFloway` (só leitura: paleta `#F7F7F5` `#DCDCD8` `#787878` `#121212`, azul `#002FA7`/`#5B7BFF` só em detalhes; Inter Tight, Azeret Mono, Instrument Serif; logo só pelos arquivos de `assets/brand/`). Regras da marca no site oficial: nada inventado (cliente, número, depoimento), trabalho sem cliente leva "Conceito", sem e-mail ou telefone na página, `noindex` até publicar, publicar é decisão da pessoa.
- **Onde parou:** estrutura do método criada; próxima fase é a 0 (descobrir a intenção) com `superpowers:brainstorming`.

**2026-11-22 · Fase 0 e requisitos (Lead, Claude Code)**

- **Entendimento confirmado:** a landing vende **sites e landing pages sob medida**, para empresas de qualquer setor (sem nicho); objetivo principal é vender; reforça a identidade com animações extravagantes e inovação, e a própria página é a prova do produto.
- **Decisões da pessoa:** desenho no **Penpot** (no lugar do Figma do método); estrutura de nove seções aprovada ("pode seguir"), descrita em `processo/requisitos.md` (R-01 a R-11); a pessoa aprova e valida seção por seção. **Formulário fora por enquanto:** a pessoa está alterando o formulário da Floway; o destino do botão final fica em aberto.
- **Referências:** a pessoa não indicou outras; a Lead usa o site oficial e a identidade como referência (chamada da Lead, a conferir).
- **Penpot:** servidor MCP copiado do projeto do site oficial para o escopo local deste projeto (fora do repositório); as ferramentas só carregam numa sessão nova.
- **Onde parou:** requisitos escritos; próximo passo é a identidade no Penpot (tokens da Floway) e o desenho do hero, celular primeiro.

- **Ferramenta (2026-11-22):** a pessoa decidiu "não utilize o codex, somente o claude". Todos os papéis no Claude Code; a revisão cruzada vira revisão com contexto limpo por outra sessão do Claude Code no Orca. A revisão do Codex dos PRs #1 e #2 tinha parado no limite de uso do Codex e foi encerrada (`worker-stop`).
