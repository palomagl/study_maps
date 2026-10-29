# StudyMaps — da trilha de código à trilha de tirar do papel

**Data:** 2026-10-28
**Autora da ideia:** Paloma Lorenzon
**Status:** desenho aprovado na conversa; abordagem de construção em aberto (ver §6)

Este documento guarda a ideia inteira. Serve para dois usos: planejar a
construção e ser colado em uma IA como briefing completo do projeto.

---

## 1. Intenção e o porquê

O StudyMaps nasceu como plataforma de roadmaps de programação: Front-end,
Back-end, Full-stack. HTML, CSS, JavaScript, React.

O problema com isso não é técnico, é de demanda. Quem quer aprender HTML hoje
pergunta para uma IA. Um roadmap de código compete com a coisa que tornou o
roadmap de código menos necessário.

A virada é esta: **o StudyMaps passa a ensinar a tirar ideias do papel usando
IA — e a fazer isso bem.**

O porquê vem da experiência real da autora. Ela aprendeu sozinha, e não com uma
ferramenta: com ChatGPT e Claude para pensar e destravar, Lovable para colocar
no ar, Pinterest e sites de referência para ter olho, e pessoas para corrigir o
rumo. Isso não é ensinado em lugar nenhum. Os cursos que existem ensinam
"prompt engineering", que é a parte menos importante.

## 2. Quem é a pessoa do outro lado

Alguém que já descobriu que consegue fazer coisas com IA, fez uma ou duas, e
travou. Os sintomas:

- o que ela gera fica genérico e ela não sabe por quê;
- ela aceita o primeiro resultado porque não sabe que podia ser melhor, nem o
  que pedir para melhorar;
- o projeto morre no preview do Lovable — nunca virou link, nunca virou repo,
  ninguém nunca usou;
- ela não sabe qual ferramenta serve para qual momento, então usa uma só para
  tudo.

Não é necessariamente programadora. Pode ser, mas o projeto não assume isso.

## 3. O inimigo tem nome: ficar feio

O resultado genérico é o adversário do produto, e vale declarar isso porque é
ele que decide o conteúdo de cada aula.

A pessoa pede, a IA entrega algo mediano, ela aceita. O app existe para
interromper esse ciclo. Toda aula precisa, em algum momento, aumentar a
capacidade da pessoa de **enxergar que está ruim** e de **dizer o que falta**.

## 4. A tese pedagógica

### 4.1 O que se ensina não é a ferramenta, é um loop

A unidade de ensino é o ciclo que a autora usa na prática:

1. **Ideia e referência** — juntar referências *antes* de abrir qualquer IA.
   Pinterest, sites reais, produtos que você admira. Sem isso, o resultado
   vai ser a média da internet, porque foi isso que você pediu.
2. **Especificação** — escrever o que você quer de verdade. A IA é co-autora
   do briefing aqui, não executora ainda.
3. **Geração** — gerar com a ferramenta certa para o tipo de coisa.
4. **Julgamento** — olhar o resultado com um checklist e dizer o que está
   errado. **Este é o passo que ninguém ensina e o passo mais importante do
   app.**
5. **Conserto** — iteração dirigida: pedir a correção específica, em vez de
   "tenta de novo".
6. **Publicação** — GitHub, depois Vercel ou Render. Repo, build, variáveis de
   ambiente, link.

As ferramentas (Claude, ChatGPT, Gemini, Lovable, Pinterest, GitHub, Vercel,
Render) aparecem como instrumento dentro do passo em que servem — não como
matéria.

### 4.2 Taste não se explica, se compara

A aula nunca diz "use referências". A aula mostra o resultado do pedido
preguiçoso e o resultado do pedido com referência e especificação, lado a lado,
e deixa a pessoa ver a diferença.

O exercício mais honesto do projeto é **"faça a versão feia de propósito,
depois conserte"**, porque treina o olho em vez de treinar a obediência.

Consequência direta para o produto: existe um tipo de questão que o StudyMaps
precisa ter e hoje não tem — *julgar*. Mostrar dois resultados e perguntar
qual está melhor e por quê. Não é decoreba, é calibragem de olho.

### 4.3 Publicar é a prova

"Tirar do papel" é literal: repositório, link no ar, projeto que existe fora do
computador da pessoa. É o único pedaço que a IA não resolve sozinha para quem
está começando, e é o pedaço que gera prova — link para mandar, repo para
mostrar, portfólio.

Ninguém se orgulha de um chat bom. Todo mundo se orgulha de um link.

### 4.4 Ferramenta se ensina no momento da necessidade

Ninguém quer fazer a "Trilha GitHub" — quem quer isso já sabe o que é Git. A
pessoa quer o app no ar; o Git aparece porque é o que falta para chegar lá.

Então deploy e versionamento são a última fase de toda trilha de entrega, e
viram **aula de decisão**, não de ferramenta:

> Tem backend e banco? Render. É só front? Vercel. Nos dois casos, GitHub
> primeiro, porque é de lá que o deploy puxa o código.

### 4.5 Curso pago entra como recomendação honesta

Quando existe um curso que realmente vale para aquele passo, ele é
recomendado — com o motivo objetivo, e sem nunca bloquear a trilha. O modelo de
conteúdo atual já exige isso (`PremiumResource.reason` é obrigatório e não
existem campos de preço, duração ou nota, justamente para não inventar).

## 5. Objetivos, não-objetivos, anti-objetivos

### Objetivos

- A pessoa termina uma trilha com **uma coisa publicada e um link**.
- A pessoa sai capaz de julgar o próprio resultado, não só de gerá-lo.
- A pessoa sabe qual ferramenta usar em qual momento, e por quê.
- O conteúdo é barato de atualizar quando as ferramentas mudarem.

### Não-objetivos

- Ensinar a programar. Pode acontecer de lambuja, não é a promessa.
- Ser catálogo de cursos ou agregador de links.
- Cobrir todas as ferramentas de IA que existem.
- Backend próprio, contas e login na primeira versão (o progresso hoje é
  local, e isso basta para validar).

### Anti-objetivos (fracasso mesmo que tudo funcione)

- Virar curso de prompt engineering.
- Ensinar deploy com passo a passo de printscreen, que apodrece em seis meses e
  vira mentira.
- Prometer que a IA faz tudo. O app existe porque ela não faz.
- A pessoa concluir a trilha sem ter publicado nada.

## 6. Abordagens

### 6.1 Eixo do produto — **decidido**

| Opção | O que é | Por quê |
|---|---|---|
| Por ferramenta | Trilha Claude, Trilha ChatGPT, Trilha Lovable | Rejeitada: ensina a ferramenta, não o loop; e GitHub/Vercel soltos não fazem sentido para ninguém |
| **Por entrega** ✅ | Trilha "Coloque seu primeiro app no ar", "Um site com a sua cara", "Automatize uma tarefa chata" | **Escolhida.** Casa com "tirar do papel", termina em prova, e deixa a ferramenta entrar onde serve |
| Híbrido | Trilhas de entrega + páginas de ferramenta como referência | Possível depois, como consulta — não como porta de entrada |

### 6.2 Abordagem de construção — **em aberto**

| Opção | O que envolve | Troca |
|---|---|---|
| **A. Reaproveitar o modelo atual** (recomendada) | Trocar conteúdo e ajustar o modelo de tipos onde ele presume código | A engenharia (~11.7k linhas) já está feita e testada; o trabalho vira conteúdo e curadoria. É a razão pela qual essa virada é barata |
| B. Recomeçar | App novo, modelo novo | Joga fora gamificação, progresso, fluxo de aula e testes que já funcionam, para resolver um problema que é de conteúdo |
| C. Dois produtos | Manter as trilhas de código e adicionar as de IA ao lado | Dobra o conteúdo a manter e dilui a proposta justamente no que a torna diferente |

**Recomendação: A.** Quase nada no código é sobre programação. O que presume
código é identificável e pequeno (§7.2).

## 7. O que já existe e o que muda

### 7.1 O que existe hoje

- Vite + React 18 + TypeScript + Tailwind + shadcn/ui, Framer Motion, React
  Router. Gerado no Lovable (`lovable-tagger` está nas devDependencies).
- Publicado em study-maps.vercel.app.
- Modelo de conteúdo: **Trilha → Fase → Etapa → Aula**. Cada aula tem conteúdo
  escrito em blocos, vídeo recomendado, recursos grátis, recurso premium com
  motivo, perguntas com dica e explicação, exercício com autoavaliação,
  desafio e checkpoint com nota de corte.
- Gamificação: XP por passo, nível, missões, conquistas.
- Progresso em `localStorage`.
- Páginas: Onboarding, Dashboard, Roadmap, Aula, Projetos, Revisão.
- Testes com Vitest cobrindo currículo, gamificação, progresso, questões,
  revisão, layout do roadmap e smoke das páginas.
- Conteúdo real: 5 aulas escritas (como a web funciona, HTML ×2, CSS ×2). O
  resto é `draft` — estrutura pronta, conteúdo vazio, e a UI já lida com isso.

### 7.2 O que o modelo presume sobre código

Pontos a mexer, todos pequenos:

- `TrailId` é uma união fixa `"frontend" | "backend" | "fullstack"` — precisa
  virar aberta, com os ids novos.
- Tipo de questão `code-output` ("qual a saída deste trecho") não serve mais
  como protagonista. Pode continuar existindo para as aulas de publicação.
- `Exercise.starter` e `Challenge.solution` assumem código. Continuam
  servindo: o entregável de um exercício aqui costuma ser um **briefing** ou
  uma **especificação** em texto, que cabe no mesmo campo com outra
  `language`.
- `Exercise.selfCheck` (o "marque quando conseguir…") já é exatamente o
  checklist de julgamento de que a tese precisa. Fica central.

### 7.3 O que falta no modelo

- **Questão de julgamento (A/B).** Mostrar dois resultados e pedir que a pessoa
  escolha o melhor e identifique o problema do outro. É o coração pedagógico e
  não existe hoje.

  Forma decidida (§12.2): questão de duas partes, as duas de escolha. Primeira
  parte, qual resultado é melhor. Segunda parte, múltipla escolha com uma lista
  de defeitos candidatos ("tipografia sem hierarquia", "espaçamento
  inconsistente", "texto genérico", "sem foco"), em que a pessoa marca os que
  se aplicam ao pior. Isso mantém a questão corrigível pelo
  `gradeQuestion` atual, contável no `passThreshold` do checkpoint e capaz de
  alimentar o baralho de revisão por `concept` — e ainda assim treina o olho,
  porque nomear o defeito é o que ensina a enxergá-lo.

- **Imagem no conteúdo.** `ContentBlock` não tem bloco de imagem nem de
  comparação visual. Sem isso, "taste se compara" não acontece — a comparação
  lado a lado precisa ser vista.

  Decidido (§12.5): as imagens entram como arquivos no próprio repositório, em
  `public/`, nunca como URL remota — aula não pode quebrar porque um site saiu
  do ar. Dois blocos novos: `image` e `compare` (par de imagens com legenda em
  cada lado).

- **Prova da pessoa.** Não existe lugar para ela registrar o link do que
  publicou. `ProjectShowcase` é vitrine da plataforma, não do aluno. O que esse
  link faz no progresso é pergunta aberta (§13).

## 8. Trilhas propostas

Cada trilha é uma entrega, e cada uma termina com algo no ar. As seis fases do
loop (§4.1) são a espinha de todas.

1. **Coloque seu primeiro app no ar** — a trilha carro-chefe. Lovable como
   gerador, referência antes de gerar, julgamento, conserto, GitHub + Vercel.
   Termina com link público.
2. **Um site com a sua cara** — peso no olho: referência, hierarquia, tipografia,
   por que o resultado padrão de IA parece todo igual. Termina com site
   publicado.
3. **Automatize uma tarefa chata** — ChatGPT e Gemini aplicados a uma tarefa
   real da pessoa. Termina com a tarefa automatizada e descrita.
4. **Da ideia ao projeto de verdade** — avançada: algo com backend e dados,
   Render, variáveis de ambiente, o que não pode ir para o repositório.

A primeira versão não precisa das quatro. Ver §9.

## 9. Escopo da primeira versão

Uma trilha inteira, de verdade, vale mais que quatro pela metade — e o app já
sabe mostrar o que é `draft` sem travar a navegação.

- **Trilha 1 completa**, as seis fases, com aulas escritas de ponta a ponta.
  Tamanho decidido (§12.1): cada passo do loop é uma **Fase**, de 1 a 3 aulas
  cada, somando cerca de **12 aulas**. "Julgamento" e "Publicação" são as fases
  mais densas, porque são as que carregam a tese; "Geração" é curta de
  propósito, porque é a parte que a pessoa já sabe fazer.
- As outras três existem como estrutura `draft`, para a pessoa ver para onde o
  projeto vai.
- Ajustes do §7.2 e os três itens do §7.3.
- Onboarding, Dashboard, Revisão e gamificação reaproveitados como estão.
- Sem login e sem backend.

**Como saber se deu certo:** gente que não é a autora termina a Trilha 1 e tem
um link para mostrar.

## 10. Restrições

- Uma pessoa construindo, com tempo limitado. Conteúdo é o gargalo, não código.
- O conteúdo não pode inventar: nada de preço, duração ou nota que não se
  saiba. Já é regra no modelo e continua valendo.
- As ferramentas mudam rápido. Aula ensina conceito e manda para a
  documentação oficial no passo a passo.
- Stack e deploy atuais são mantidos.
- **A trilha tem de ser concluível no plano grátis** (§12.4). Se o limite
  gratuito de uma ferramenta não permitir chegar até o link publicado, a aula
  nomeia uma alternativa gratuita. Uma trilha cujo passo final exige cartão de
  crédito falha exatamente no "publicar é a prova".

## 11. Em aberto para quem constrói

- Layout e visual das novas telas, dentro da identidade atual (dark, neon,
  azul).
- Nomes finais das trilhas, fases e aulas.
- Ordem de implementação.
- Se a prova da pessoa (§7.3) fica só no `localStorage` nesta versão.

## 12. Decisões tomadas por quem constrói

Pontos que a revisão levantou e que não precisavam voltar para a autora. Estão
listados para ela poder discordar.

**12.1 Tamanho da Trilha 1.** Cada passo do loop é uma Fase; 1 a 3 aulas por
fase; ~12 aulas no total. Fases densas: Julgamento e Publicação. Isso também
define que `Phase` mapeia 1:1 com passo do loop e que `Stage` continua
agrupando aulas dentro da fase — sem isso, `Stage` viraria embalagem vazia e o
layout do roadmap perderia sentido.

**12.2 A questão A/B é corrigível automaticamente.** Duas partes, as duas de
escolha, conforme §7.3. Texto livre foi descartado: não é corrigível sem
backend, não contaria no checkpoint e não alimentaria a revisão por conceito —
e o produto não tem backend nesta versão.

**12.3 As trilhas de código são arquivadas, não apagadas.** Os arquivos de
`frontend`, `backend` e `fullstack` e as cinco aulas escritas saem do array
`curriculum`, mas ficam no repositório. São o único conteúdo real já escrito e
podem voltar como material de consulta (a linha "híbrido" da §6.1). As rotas
antigas (`/roadmap/frontend` etc.) ganham redirecionamento em vez de 404.

**12.4 Plano grátis é requisito, não preferência.** Ver §10.

**12.5 Imagens de comparação ficam no repositório.** Ver §7.3.

**12.6 O `selfCheck` do exercício passa a ser salvo.** Hoje os checkboxes vivem
em `useState` dentro de `ExercisePanel` e somem ao recarregar a página. Como a
tese promove esse checklist a instrumento de julgamento, e como o trabalho real
(juntar referência, gerar, publicar) acontece fora do app ao longo de dias,
perder as marcações é inaceitável. Vai para o `ProgressStore`.

**12.7 Progresso antigo é migrado, não descartado.** Já existe precedente no
código (`migrateLegacyIfNeeded`, que faz backup do blob antigo e começa
limpo). XP, conquistas e sequência sobrevivem; as entradas de aulas que não
existem mais são limpas em vez de ficarem órfãs.

## 13. Perguntas abertas para a autora

Só ela pode responder; cada uma muda o que se constrói.

1. **Quem escreve o conteúdo das aulas.** Se for rascunho feito por IA e
   revisado por ela, o plano é um; se for ela escrevendo, o plano é outro e
   muito menor do lado do código. A regra de não inventar (§10) pesa aqui:
   cada link, vídeo e curso recomendado precisa ser verificado de verdade.
2. **De onde vêm os pares de imagem "feio vs. bom".** Alguém precisa gerar as
   duas versões de cada comparação. E se vale embutir print de site de
   terceiro como referência.
3. **Dá para concluir a trilha sem ter publicado.** O anti-objetivo diz que
   não, mas o link é autodeclarado e inverificável sem backend. Se ele trava a
   conclusão, mexe em passos, XP, conquistas e Dashboard.
4. **O projeto ainda é editado pelo Lovable.** Se sim, uma refatoração grande
   feita à mão corre risco de ser sobrescrita, e o trabalho precisa de branch e
   plano de merge.
