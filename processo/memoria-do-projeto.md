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

**2026-11-22 · Hero aprovado (Lead, Claude Code)**

- **Aprovado pela pessoa:** hero com cabeçalho (R-01, R-02), celular e desktop, registrados em `processo/telas/` com os tokens do Penpot. Desenho feito pela Lead no Penpot via MCP (servidor do projeto, chamado por HTTP porque as ferramentas não carregaram nesta sessão).
- **Pedido novo da pessoa:** garantir o **senso de urgência da Black Friday**. Muda o que será construído; falta a pessoa dizer a oferta real (o que, quanto, até quando), porque nada pode ser inventado.
- **Atenção:** o arquivo `New File 4` do Penpot também tem, na página 1, um desenho do site oficial; não foi tocado.

**2026-11-22 · Black Friday (Lead, Claude Code)**

- **Oferta da pessoa:** site por **R$ 997**, entregue em **até 3 dias**, para projetos fechados até **27/11/2026 às 23h59**. Na página: faixa de urgência fixa com contagem regressiva real, selo e linha de condição no hero (aprovado em 2026-11-22). Ao zerar, faixa e selo somem e o hero volta à versão aprovada sem a oferta.
- **Prazo:** a página precisa estar no ar antes de 27/11. A pessoa aprovou a **versão enxuta** (hero, incluso, conceitos, perguntas, chamada final); dor, virada, processo e "por que a Floway" ficam para a segunda leva.
