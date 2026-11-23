# Requisitos

Landing page da Floway que **vende sites e landing pages sob medida** para empresas de qualquer setor (sem nicho). A própria página é a prova: as animações extravagantes da marca demonstram o produto. Estrutura de seções aprovada pela pessoa em 2026-11-22 ("pode seguir"). Escreveu a Lead (sem o modo com especialistas). Lista, pesos e ordem aprovados pela pessoa em 2026-11-22. **Prazo:** a página vai ao ar antes da Black Friday (27/11/2026), numa **primeira leva enxuta** aprovada pela pessoa: R-01, R-02, R-12, R-05, R-06, R-09, R-10 e R-11. A segunda leva (R-03, R-04, R-07, R-08) entra depois. Como escrever cada ficha: modelo de requisitos do método (skill `metodo:consultar`).

Telas: desenhadas no **Penpot** (decisão da pessoa, no lugar do Figma do método), começando pelo celular, e registradas em `processo/telas/` a cada aprovação.

| ID | Requisito | Valor | Esforço | Risco | Prioridade proposta |
|---|---|---|---|---|---|
| R-01 | Hero com a promessa e o botão principal | alto | G | médio | 1 (leva 1) |
| R-02 | Cabeçalho com o botão de contato sempre à mão | alto | P | baixo | 2 (leva 1) |
| R-03 | A dor: "seu site não vende" | alto | M | baixo | leva 2 |
| R-04 | A virada: a página mostra que ela é o produto | alto | M | médio | leva 2 |
| R-05 | O que está incluso | alto | M | baixo | 4 (leva 1) |
| R-06 | Conceitos (prova) | alto | M | médio | 5 (leva 1) |
| R-07 | Processo | médio | M | baixo | leva 2 |
| R-08 | Por que a Floway | médio | P | médio | leva 2 |
| R-09 | Perguntas frequentes | médio | P | baixo | 6 (leva 1) |
| R-10 | Chamada final | alto | G | médio | 7 (leva 1) |
| R-11 | Regras transversais (marca, acessibilidade, desempenho) | alto | M | médio | junto de cada seção |
| R-12 | Urgência da Black Friday | alto | M | médio | 3 (leva 1) |

## R-01 · Hero com a promessa e o botão principal

- **História:** como dono ou gestor de uma empresa que chegou à página, quero entender em segundos o que a Floway faz e sentir que é diferente, para decidir continuar lendo ou pedir um projeto.
- **Regras de negócio:** uma promessa (título curto) e uma frase de apoio; uma faixa de benefícios no pé da seção (Estratégia, Texto que vende, Design sob medida, Animação e 3D, Site rápido, Medição), rolando devagar; um botão principal "Iniciar um projeto" e um secundário que leva às seções abaixo; a palavra FLOWAY com o efeito de vidro e glitch da marca, montada na entrada e na rolagem.
- **Casos de erro:** sem WebGL, a palavra aparece estática com o mesmo enquadramento; com movimento reduzido, sem animação e com todo o texto visível.
- **Critérios de aceite:**
  - [ ] título, frase de apoio e botão principal visíveis sem rolar em 390×844 e em 1440×900
  - [ ] a animação de entrada termina em até 2 s e não bloqueia o clique no botão
- **Dependências:** R-11.
- **Telas:** `Hero · celular`, `Hero · desktop` (Penpot), registro em `processo/telas/`.
- **Peso:** valor alto (decide se a pessoa fica); esforço G (efeito WebGL); risco médio (desempenho no celular, já visto no site oficial).
- **Prioridade proposta:** 1, porque define a linguagem visual de toda a página.
- **Fora do escopo:** vídeo de fundo.

## R-02 · Cabeçalho com o botão de contato sempre à mão

- **História:** como visitante decidido no meio da página, quero pedir um projeto sem voltar ao topo.
- **Regras de negócio:** logo da Floway (arquivos de `assets/brand/` da identidade), links para as seções e o botão "Iniciar um projeto" sempre visível; no celular, menu recolhido com o botão fora dele.
- **Casos de erro:** o cabeçalho nunca cobre o título de uma seção ao navegar pelos links.
- **Critérios de aceite:**
  - [ ] o botão fica visível em qualquer ponto da rolagem, no celular e no desktop
  - [ ] o menu abre e fecha pelo teclado (Tab, Enter, Esc)
- **Dependências:** R-11.
- **Telas:** `Cabeçalho · celular` (aberto e fechado), `Cabeçalho · desktop`.
- **Peso:** valor alto; esforço P; risco baixo.
- **Prioridade proposta:** 2, porque é pequeno e sustenta a conversão de todas as seções.
- **Fora do escopo:** seletor de idioma (a página é só em português nesta versão).

## R-03 · A dor: "seu site não vende"

- **História:** como empresa com um site fraco ou sem site, quero me reconhecer no problema, para sentir que a Floway entende o meu caso.
- **Regras de negócio:** três dores curtas (o site não passa confiança, ninguém entra em contato, parece com todos os outros); uma "página comum" que se desmonta em fragmentos na rolagem.
- **Casos de erro:** com movimento reduzido, a página comum aparece já desmontada, estática.
- **Critérios de aceite:**
  - [ ] as três dores legíveis em 390 px sem rolagem horizontal
- **Dependências:** R-01.
- **Telas:** `Dor · celular`, `Dor · desktop`.
- **Peso:** valor alto (cria a necessidade); esforço M; risco baixo.
- **Prioridade proposta:** leva 2.
- **Fora do escopo:** números de mercado (nenhum número inventado, R-11).

## R-04 · A virada: a página mostra que ela é o produto

- **História:** como visitante que acabou de ver as animações, quero perceber que é isso que eu compraria, para ligar o efeito ao valor.
- **Regras de negócio:** uma frase de virada ("o que você está sentindo agora é o produto", texto final a aprovar) e marcações que apontam os efeitos que a pessoa já viu na página.
- **Casos de erro:** com movimento reduzido, a frase continua fazendo sentido sem citar animação que a pessoa não viu.
- **Critérios de aceite:**
  - [ ] cada efeito citado existe numa seção anterior da página
- **Dependências:** R-01, R-03.
- **Telas:** `Virada · celular`, `Virada · desktop`.
- **Peso:** valor alto (é o diferencial da página); esforço M; risco médio (a ideia precisa ficar clara sem explicação).
- **Prioridade proposta:** leva 2.
- **Fora do escopo:** demonstração interativa editável pelo visitante.

## R-05 · O que está incluso

- **História:** como comprador, quero saber exatamente o que recebo, para comparar com outras opções.
- **Regras de negócio:** estratégia e estrutura, texto que vende, design sob medida, animação e 3D, site rápido e no Google, medição; cartões que se encaixam como peças na rolagem.
- **Casos de erro:** preço e prazo só os da oferta de R-12, enquanto ela valer; nenhum outro preço ou prazo.
- **Critérios de aceite:**
  - [ ] cada item tem título e uma frase; nenhum destes termos aparece sem uma frase que o explique: SEO, WebGL, 3D, CRM, conversão
- **Dependências:** R-11.
- **Telas:** `Incluso · celular`, `Incluso · desktop`.
- **Peso:** valor alto; esforço M; risco baixo.
- **Prioridade proposta:** 4 (leva 1).
- **Fora do escopo:** tabela de preços (o único preço é o da oferta de R-12).

## R-06 · Conceitos (prova)

- **História:** como comprador desconfiado, quero ver trabalhos da Floway, para acreditar na qualidade.
- **Regras de negócio:** galeria horizontal com capa revelada no hover (no celular, sem hover, a capa aparece por padrão); todo trabalho sem cliente leva o rótulo "Conceito"; nenhum cliente ou resultado inventado.
- **Casos de erro:** imagem que não carrega mostra a cor de fundo e o nome do conceito.
- **Critérios de aceite:**
  - [ ] todo cartão sem cliente mostra "Conceito"
  - [ ] a galeria funciona pelo teclado
- **Dependências:** R-11; quais conceitos entram é decisão da pessoa.
- **Telas:** `Conceitos · celular`, `Conceitos · desktop`.
- **Peso:** valor alto (prova); esforço M; risco médio (direitos e marcas fictícias, INPI).
- **Prioridade proposta:** 5 (leva 1).
- **Fora do escopo:** página de case.

## R-07 · Processo

- **História:** como comprador, quero saber como o projeto anda, para sentir menos risco.
- **Regras de negócio:** etapas curtas (diagnóstico, design, construção e no ar, melhoria contínua opcional), cada uma com o que a empresa aprova; uma linha de partículas percorre as etapas na rolagem.
- **Casos de erro:** com movimento reduzido, a linha aparece completa.
- **Critérios de aceite:**
  - [ ] cada etapa diz o que a empresa aprova nela
- **Dependências:** R-11.
- **Telas:** `Processo · celular`, `Processo · desktop`.
- **Peso:** valor médio; esforço M; risco baixo.
- **Prioridade proposta:** leva 2.
- **Fora do escopo:** prazos em dias, além da entrega em até 3 dias da oferta de R-12.

## R-08 · Por que a Floway

- **História:** como comprador comparando opções, quero ver a diferença entre a Floway, um template e uma agência comum.
- **Regras de negócio:** comparação lado a lado por critérios qualitativos; nenhum número, prêmio ou cliente inventado.
- **Casos de erro:** no celular, a comparação vira uma lista por critério, sem tabela larga.
- **Critérios de aceite:**
  - [ ] nenhuma afirmação numérica sem fonte
- **Dependências:** R-11.
- **Telas:** `Por que · celular`, `Por que · desktop`.
- **Peso:** valor médio; esforço P; risco médio (afirmações comparativas precisam ser verdadeiras).
- **Prioridade proposta:** leva 2.
- **Fora do escopo:** citar concorrentes pelo nome.

## R-09 · Perguntas frequentes

- **História:** como comprador com dúvidas, quero respostas diretas antes de falar com alguém.
- **Regras de negócio:** perguntas sobre diferença entre site e landing page, prazo (enquanto a oferta de R-12 vale: entrega em até 3 dias; depois: o prazo sai do diagnóstico), identidade visual, integrações e manutenção; respostas abrem com movimento suave.
- **Casos de erro:** com JavaScript desligado, as respostas ficam visíveis.
- **Critérios de aceite:**
  - [ ] cada pergunta abre e fecha pelo teclado e informa o estado ao leitor de tela
- **Dependências:** R-11.
- **Telas:** `Perguntas · celular`, `Perguntas · desktop`.
- **Peso:** valor médio; esforço P; risco baixo.
- **Prioridade proposta:** 6 (leva 1).
- **Fora do escopo:** busca nas perguntas.

## R-10 · Chamada final

- **História:** como visitante convencido, quero pedir um projeto em um clique.
- **Regras de negócio:** frase de fechamento e o botão "Iniciar um projeto"; a esfera de partículas da marca que vira o "F". **O destino do botão fica em aberto** até a pessoa terminar as alterações no formulário da Floway.
- **Casos de erro:** sem WebGL ou com movimento reduzido, o "F" aparece estático.
- **Critérios de aceite:**
  - [ ] o botão segue a captura aprovada da seção em `processo/telas/` (posição, tamanho e cor)
- **Dependências:** R-01; destino do botão (pessoa) — sem ele a leva 1 não converte, então precisa estar definido antes da publicação de 27/11.
- **Telas:** `Chamada final · celular`, `Chamada final · desktop`.
- **Peso:** valor alto (é a conversão); esforço G (esfera); risco médio (destino pendente).
- **Prioridade proposta:** 7 (leva 1), desenhada junto do hero porque repete a linguagem dele.
- **Fora do escopo:** o formulário em si.
- **Durante a oferta:** a chamada final repete a condição de R-12 (valor, entrega e prazo).

## R-11 · Regras transversais

- **Regras de negócio:** identidade de `CreateHubAI/identidadeFloway` (paleta `#F7F7F5` `#DCDCD8` `#787878` `#121212`, azul só em detalhes; Inter Tight, Azeret Mono, Instrument Serif; logo só pelos arquivos oficiais); nada inventado (cliente, número, depoimento, prêmio); sem e-mail ou telefone na página; `noindex` até a publicação, que é decisão da pessoa; mobile-first.
- **Critérios de aceite:**
  - [ ] sem rolagem horizontal de 360 px a 1920 px
  - [ ] com movimento reduzido, todo o conteúdo visível e sem animação
  - [ ] sem WebGL, a página continua completa
  - [ ] Lighthouse no celular: desempenho ≥ 80 e acessibilidade ≥ 95
- **Telas:** vale para todas.

## R-12 · Urgência da Black Friday

- **História:** como empresa que está pensando em ter um site, quero saber que existe uma condição que acaba logo, para decidir agora.
- **Regras de negócio:** a oferta, definida pela pessoa em 2026-11-22: **site por R$ 997, entregue em até 3 dias, para projetos fechados até 27/11/2026 às 23h59** (horário de Brasília). Faixa fixa no topo com a oferta e a contagem regressiva até esse momento; selo "Black Friday" e a linha da condição no hero; a chamada final repete a condição. A contagem é real, calculada do relógio do visitante contra o fim em horário de Brasília (risco aceito: relógio errado no aparelho do visitante mostra a contagem errada); nada de contagem que reinicia. **Fim exato (chamada da Lead, a confirmar):** a oferta vale até 27/11/2026 23h59min59s (UTC−3) e some a partir de 28/11/2026 00h00min00s. A contagem arredonda para cima, para nunca mostrar zero enquanto vale.
- **Textos exatos:** faixa no desktop "Black Friday · Site por R$ 997, entregue em até 3 dias · até 27/11 às 23h59"; faixa no celular "Black Friday · Site por R$ 997"; linha do hero e chamada final "Site por R$ 997, entregue em até 3 dias, para projetos fechados até 27/11 às 23h59."; cartão da oferta (R-05) "R$ 997 · Site completo, entregue em até 3 dias. Para projetos fechados até 27/11 às 23h59."
- **Casos de erro:** depois do fim, a faixa, o selo e a linha da condição somem e o hero volta à versão aprovada sem a oferta (nunca "00d 00h 00m" parado na tela); sem JavaScript, a faixa mostra os mesmos textos sem a contagem (a data já está no texto); como o site é estático, uma publicação em 28/11 a partir de 00h00 tira a oferta do HTML (tarefa de publicação, aprovada pela pessoa como as outras).
- **Critérios de aceite:**
  - [ ] com o relógio em 27/11/2026 23h58min30s (UTC−3), a contagem mostra 2 minutos no celular ("00d 00h 02m") e 1 min 30 s no desktop; em 28/11/2026 00h00min00s, a oferta não aparece
  - [ ] cada lugar da página mostra exatamente o texto da linha "Textos exatos" acima
  - [ ] a faixa não cobre o cabeçalho nem o botão "Iniciar um projeto"
- **Dependências:** R-01, R-02.
- **Telas:** `Hero · celular · Black Friday`, `Hero · desktop · Black Friday` (Penpot), registro em `processo/telas/`.
- **Peso:** valor alto (urgência da campanha); esforço M; risco médio (fuso horário e oferta que precisa sumir na hora certa).
- **Prioridade proposta:** 3, logo depois do hero e do cabeçalho.
- **Pendente da pessoa:** o que os R$ 997 cobrem (quantas páginas, se vale para landing page e para site, quais itens de R-05) e quando começam os 3 dias.
- **Fora do escopo:** limite de vagas (a pessoa não definiu); cupom ou pagamento na página.
