# Como desenvolvemos este projeto

Versão do método: 7.0.0
Lead: Claude Code
Telas: (link do arquivo do Figma; registro em processo/telas/; "sem interface" se não houver)
Cenários aplicados:
- site-estatico (testado em 1 projeto)

Os detalhes de cada fase, os cenários, os casos e as lições ficam no repositório do método (privado). Este documento registra só o que vale **neste projeto**: ajuste-o à medida que decidir.

## Regras que valem aqui

1. **Alvo antes de construir.** Entender, escrever de volta, desenhar e só então construir.
2. **Uma mudança, uma branch.** Nunca commit direto na `main`; tudo entra por Pull Request com o CI verde.
3. **Teste primeiro, em duas camadas.** Micro (TDD, visto falhar antes do código) e macro (suíte completa, build, exploração).
4. **Quem constrói não valida.** A sessão Lead refaz os testes e explora o resultado antes de integrar.
5. **As branches integradas ficam no GitHub.** Integre com `gh pr merge N --merge`, sem `--delete-branch`.
6. **A pessoa decide o que tem impacto grande** (seção Aprovações, abaixo); o resto a Lead decide e registra.

## Ferramenta por papel

Cada sessão usa a ferramenta do seu papel; a Builder usa a do papel de quem a abre e vai para a outra quando a cota aperta (com passagem pela issue). No Orca: `--agent claude --model claude-opus-5-5` (Claude Code) ou `--agent codex --model gpt-6.1-sol` (Codex). Mudar esta tabela é uma decisão da pessoa, registrada na memória.

| Papel | Ferramenta padrão |
|---|---|
| Lead | Claude Code |
| Product | Claude Code |
| Architect | Claude Code |
| Frontend | Claude Code |
| Designer | Claude Code |
| Backend | Codex |
| Security | Codex |
| Ops | Codex |

## Aprovações

Uma decisão é da pessoa quando aciona pelo menos um gatilho: muda **o que** será construído; é difícil ou impossível de desfazer; atinge usuários reais; custa dinheiro ou muita cota; aceita um risco de segurança ou de dados pessoais; muda as regras do jogo (harness, método, a Lead, a tabela Ferramenta por papel). Sem gatilho, a Lead decide e registra na issue ou na memória; na dúvida, sobe para a pessoa. Um PR dentro do plano aprovado, com CI verde, validação sem achado crítico nem importante, só nos arquivos permitidos e sem gatilho, a Lead integra sozinha. A Lead escreve um resumo por marco do que aprovou sozinha. A tabela completa está no núcleo 01 do método ("Portões de aprovação"); anote aqui o que a pessoa mudar:

- (nenhum ajuste ainda)

## Comandos do projeto

- Testes: (preencha)
- Tipos / lint: (preencha)
- Build: (preencha)
- Servidor local: (preencha)

## Tarefas e sessões

- Tarefas: issues com o formulário de tarefa (`.github/ISSUE_TEMPLATE/tarefa.yml`). Bugs: o formulário de bug (`.github/ISSUE_TEMPLATE/bug.yml`) e o "Ciclo de um bug" do método.
- Worktrees: `processo/scripts/nova-tarefa.sh <tipo> <slug>` e `processo/scripts/remover-tarefa.sh <tipo> <slug>`.
- Com o Orca: a Lead distribui as tarefas aos agentes (`orca orchestration worker-start`); o Orca cria e remove as worktrees, e os scripts acima ficam para quem trabalha sem ele. Prompt: `modelos/prompt-lead-orca.md` do método.
- Ferramentas: cada papel usa a sua (seção Ferramenta por papel, acima). O Claude Code lê o `CLAUDE.md`; o Codex lê o `AGENTS.md`, que manda ler o `CLAUDE.md`. Todo PR recebe ao menos uma revisão da outra ferramenta. Quando a cota acaba no meio da tarefa, a Builder faz commit, envia a branch e comenta na issue onde parou; outra Builder, na outra ferramenta, continua na mesma branch. Com back e front em tarefas paralelas, o contrato da API é aprovado antes de qualquer tarefa de construção.
- Para trazer este projeto à versão mais nova do método: `/metodo:atualizar-projeto`.
- Requisitos: `processo/requisitos.md` (fichas R-xx com o peso). Com interface, a identidade e todas as telas são aprovadas no Figma e registradas em `processo/telas/` antes do plano; o código segue a versão registrada.
- Memória do projeto: `processo/memoria-do-projeto.md`.

## Antes do primeiro push para um repositório público

Rode a higiene de dados do método: nada de e-mail pessoal, telefone ou token em documentos, testes e commits.
