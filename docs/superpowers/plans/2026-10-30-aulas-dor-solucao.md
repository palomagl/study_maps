# Aulas no formato dor → solução — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Escrever as 12 aulas da Trilha 1 no formato dor → solução, com a dor garantida por teste, visível na aula e no mapa.

**Architecture:** A dor vira um campo próprio da aula (`Lesson.pain`), exigido por teste em toda aula `available` e conferido contra a tabela aprovada. Três componentes novos (cartão da dor, "o que resolve" com o agente da fase, "dor resolvida") entram na `LessonView`, já na paleta nova; a dor também aparece no mapa e na lista. Depois disso, a aula 4.1 é convertida e vira o molde das outras onze, escritas uma por tarefa.

**Tech Stack:** React 18, TypeScript 5.8, Vite 5, Tailwind 3.4, Vitest 3 + Testing Library.

**Spec:** [`docs/superpowers/specs/2026-10-30-aulas-dor-solucao-design.md`](../specs/2026-10-30-aulas-dor-solucao-design.md) — continua [`2026-10-28-studymaps-ia-design.md`](../specs/2026-10-28-studymaps-ia-design.md). Maquete aprovada do molde: [`specs/mockups/aula-dor-solucao.html`](../specs/mockups/aula-dor-solucao.html).

## Global Constraints

- Branch: `feat/trilhas-de-entrega-ia` (já no GitHub, PR ainda não aberto). Não fazer push nem abrir PR.
- Typecheck: `npx tsc -p tsconfig.app.json --noEmit`. **Não** `npx tsc --noEmit` — o tsconfig da raiz não compila nada.
- Testes: `npm run test`.
- Tratamento **"tu" do jeito falado** (spec §12): verbo na 3ª pessoa ("tu faz", "tu pede"), teu/tua/contigo, imperativo falado ("olha", "faz", "pede", "repara"). Nunca "você". Títulos incluídos.
- Tom: gente de 16 a 25 anos, maioria homens. Direto, sem gíria forçada, **sem tom infantil** (spec §3).
- **Nada inventado.** Todo recurso, vídeo ou curso só entra depois de a URL ser aberta e conferida. Sem preço, duração ou nota que não estejam confirmados. `durationLabel` só com valor confirmado. Vídeo (`video`) só com id de YouTube verificado — na dúvida, a aula fica sem vídeo.
- **Se uma verificação contradisser uma frase aprovada da tabela de dores** (ex.: "nos dois, plano grátis" deixou de ser verdade), **parar e reportar**. A tabela foi aprovada pela autora; não se reescreve em silêncio.
- Aula de ferramenta ensina o conceito e manda para a documentação oficial no passo a passo. Proibido passo a passo baseado em captura de tela de ferramenta de terceiro.
- Ids e slugs das aulas não mudam (spec §10.4).
- Paleta dos componentes novos (spec §9): fundo `#0B0717`, superfície `#120C26`, borda `#2E2357`, texto `#F2EEFF`, texto secundário `#A99CD6`, roxo `#7C5CFF`, menta `#3DF5B0`, dor `#FF6B8A`. Agentes: Ideia `#FFB020`, Pedido `#3DF5B0`, Geração `#FF3D9A`, Julgamento `#7C5CFF`, Conserto `#FF6B2C`, No ar `#2EC5FF`.

## A tabela de dores (verbatim da spec §5 — fonte da verdade dos testes)

| id | título (em "tu") | quote | resolve | after |
|---|---|---|---|---|
| `ar-ideia-01-recortar` | Recorta a ideia até ela caber | Tenho uma ideia gigante e não sei nem por onde começar. | Achar a menor versão que já serve pra alguém. | Sei qual é a primeira versão — e ela cabe num fim de semana. |
| `ar-ideia-02-referencias` | Junta cinco referências | Peço pra IA e sempre sai a mesma cara de site. | Juntar referência antes de abrir a IA. | Tenho cinco referências e sei o que eu quero de cada uma. |
| `ar-spec-01-briefing` | Escreve o briefing antes do prompt | A IA não faz o que eu tô pedindo. | Dizer pra quem é, o que a pessoa faz na tela e o que não entra — antes do prompt. | Meu pedido cabe numa página e não deixa a IA adivinhar. |
| `ar-spec-02-co-autoria` | Usa a IA pra melhorar teu pedido | Só descubro o que faltava no pedido depois que vem errado. | Pedir as perguntas antes de pedir o resultado. | A IA me pergunta o que faltava antes de gerar qualquer coisa. |
| `ar-ger-01-ferramenta-certa` | A ferramenta certa pra cada pedaço | Uso o ChatGPT pra tudo e fico travado. | Saber qual ferramenta faz melhor cada pedaço do projeto. | Lovable pra tela, Claude ou ChatGPT pra pensar e escrever — cada um no seu lugar. |
| `ar-jul-01-generico` | O que faz um resultado parecer genérico | Pedi um site pra IA e veio um site. Achei meio feio, mas não sei dizer o quê — então deixei assim. | Dar nome ao defeito. Quem nomeia, conserta. | Tudo com o mesmo peso, três botões brigando e um texto que serve pra qualquer um. |
| `ar-jul-02-checklist` | Teu checklist de julgamento | Toda vez eu aceito o primeiro resultado que vem. | Seis perguntas que tu faz a qualquer tela antes de aceitar. | Passo qualquer resultado no checklist antes de dizer 'tá bom'. |
| `ar-jul-03-feio-de-proposito` | Faz a versão feia de propósito | Só percebo que tá ruim quando alguém me fala. | Gerar o ruim de propósito pra treinar o olho. | Eu vejo o defeito antes de alguém apontar. |
| `ar-cons-01-iteracao` | Pede a correção, não outra tentativa | Pedi pra arrumar uma coisa e a IA estragou o que tava bom. | Um ajuste por vez: o defeito com nome, e o que não pode mexer. | Peço o conserto e o resto fica no lugar. |
| `ar-pub-01-github` | GitHub: onde teu projeto passa a existir | Meu projeto só existe no meu computador — ou no preview do Lovable. | Um repositório: o lugar de onde o deploy puxa o código. | Meu código tá no GitHub, com histórico de tudo que mudou. |
| `ar-pub-02-vercel-render` | Vercel ou Render: a decisão | Não sei onde colocar meu app no ar e tenho medo de virar conta pra pagar. | Só front: Vercel. Tem backend e banco: Render. Nos dois, plano grátis. | Sei onde meu tipo de app vai morar — e de graça. |
| `ar-pub-03-no-ar` | No ar, com link pra mandar | Tá pronto, mas ninguém consegue ver. | Publicar, guardar o que não pode vazar e registrar o link. | Mandei o link pra alguém e abriu. |

O texto vai **sem aspas** nos campos; quem desenha as aspas é o componente.

## Review Focus

1. **Aula em rascunho aberta direto pelo link** (só tem `quote`) — a página mostra "em produção" como hoje e **não** desenha cartão de "o que resolve" nem "dor resolvida" vazios. → Tarefa 2, Passo 1.
2. **Aula `available` sem `resolveDetail`** — o cartão "o que resolve" aparece sem linha vazia embaixo. → Tarefa 2, Passo 1.
3. **Aula de uma fase sem agente** (trilhas arquivadas, uma trilha 2 futura) — `agentForPhase` devolve `null` e o cartão aparece sem o agente, em vez de quebrar ou mostrar o agente errado. → Tarefa 2, Passo 1.
4. **"Você" escapando para uma aula em "tu"** — um teste varre o texto de toda aula `available`. → Tarefa 4, Passo 1.
5. **Dor longa num celular de 375px** — quebra linha, sem rolagem horizontal da página. → Tarefa 16, Passo 3 (verificação no navegador; é layout).
6. **Fato da tabela que a verificação desmente** (plano grátis, nome de modo de uma ferramenta) — parar e reportar, não reescrever. → Receita de aula, Passo 3.
7. **Página da trilha abrindo por um formulário** — o mapa (o conteúdo) vem antes do cartão da prova e do certificado. → Tarefa A4, Passo 1.

## Ordem de execução — revisada em 30/10 a pedido da autora

A autora viu que o app ainda tinha a cara antiga e pediu que **tudo mude primeiro**, com os robôs. O redesenho visual, que a spec deixava para depois, entra na frente das aulas (Parte A abaixo). A ordem fica:

1. Tarefa 1 (a dor no modelo — pequena, e o mapa e a aula novos já precisam dela)
2. A1 → A2 → A3 → A4 (inclui a Tarefa 3) → A5 (inclui a Tarefa 2) → A6
3. Tarefa 4 (converter a 4.1)
4. Tarefas 5 a 15 (as onze aulas)
5. A7 + Tarefa 16 (verificação final)

---

## Parte A — o visual dos agentes no app inteiro

Fonte: as maquetes aprovadas em `docs/superpowers/specs/mockups/telas-agentes.html` (início, mapa, aula) e `aula-dor-solucao.html`. Onde a maquete e este texto divergirem, vale a maquete. **Nada do visual antigo fica:** sem fundo quadriculado, sem brilho neon, sem título em degradê.

### Task A1: Tema — cores, fontes e fundo

**Files:** `src/index.css`, `tailwind.config.ts`

- [ ] **Step 1: Trocar as variáveis de cor** de `:root` para a paleta da spec §9, em HSL: `--background 255 54% 6%` · `--card`/`--popover 254 52% 10%` · `--secondary 253 51% 15%` · `--muted 254 55% 12%` · `--border`/`--input 253 43% 24%` · `--foreground` e os `*-foreground` claros `254 100% 97%` · `--muted-foreground 253 41% 73%` · `--primary 158 90% 60%` (menta) com `--primary-foreground 255 54% 6%` · `--accent`/`--ring 252 100% 68%` (roxo). As `--neon-*` passam a apontar para as cores dos agentes (cyan→`#2EC5FF`, purple/blue→`#7C5CFF`, green→`#3DF5B0`, pink→`#FF3D9A`, orange→`#FF6B2C`), para o que ainda usa `neon` herdar a paleta.
- [ ] **Step 2: Fontes.** Carregar Archivo (eixos `wdth 62..125`, `wght 500..900`), Inter e JetBrains Mono. Em `tailwind.config.ts`: `fontFamily.display = ["Archivo", …]`, `fontFamily.mono = ["JetBrains Mono", …]`.
- [ ] **Step 3: Utilitários.** `.title-display` (Archivo, `font-stretch: 125%`, peso 900, caixa alta, `letter-spacing: -.01em`, `line-height: .95`); `.bg-ceu` (o fundo da maquete: dois `radial-gradient` roxo e menta sobre `#0B0717`) substitui `.bg-grid`, que passa a ser apelido de `.bg-ceu`; `.glow-*` viram borda discreta sem brilho; `.gradient-text` vira cor sólida menta; `.text-glow-cyan` some.
- [ ] **Step 4:** `npm run test && npx tsc -p tsconfig.app.json --noEmit` → PASS; abrir o app e conferir que nada tem mais neon nem quadriculado.
- [ ] **Step 5: Commit** — `style: tema dos agentes — roxo profundo, menta, Archivo`

### Task A2: Os seis agentes e o time

**Files:** Create `src/lib/agents.ts`, `src/components/agents/Agent.tsx`; Modify `src/lib/progress-selectors.ts`; Test `src/lib/agents.test.ts`, `src/lib/progress-selectors.test.ts`

**Interfaces — Produces:** `AgentKind`, `AGENTS`, `agentForPhase` e `Agent` exatamente como na Tarefa 2 abaixo (a Tarefa 2 passa a consumir daqui), mais:
```ts
// progress-selectors.ts
export function teamStatus(state: ProgressState, trail: Trail):
  { kind: AgentKind; phaseId: string; unlocked: boolean }[];   // unlocked = phaseComplete(state, phase)
```
`Agent` renderiza `<svg role="img" aria-label="Agente {label}">` (bloqueado: "Agente bloqueado"); desenho portado da maquete, com a sombra e os olhos inline por instância.

- [ ] **Step 1: Testes que falham** — os dois de `agentForPhase` da Tarefa 2, mais:
```ts
it("time começa vazio", () => {
  expect(teamStatus(defaultState(), appNoArTrail).every((a) => !a.unlocked)).toBe(true);
});
it("concluir as aulas escritas de uma fase recruta o agente dela", () => {
  const s = defaultState();
  for (const { lesson, phase } of flattenLessons(appNoArTrail))
    if (phase.id === "ar-p4" && lesson.status === "available")
      s.lessons[lesson.id] = { steps: Object.fromEntries(lessonSteps(lesson).map((k) => [k, true])), checkpoint: null };
  expect(teamStatus(s, appNoArTrail).find((a) => a.kind === "julgamento")!.unlocked).toBe(true);
});
```
- [ ] **Step 2:** rodar → FAIL. **Step 3:** implementar. **Step 4:** suíte + typecheck → PASS. **Step 5: Commit** — `feat: os seis agentes e o time da trilha`

### Task A3: Página inicial — o palco

**Files:** `src/pages/Index.tsx`, `src/components/Header.tsx`; Test `src/pages/pages.smoke.test.tsx`

- [ ] **Step 1: Teste que falha**
```ts
it("a home mostra o time no palco", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { name: /Tire suas ideias do papel/i, level: 1 })).toBeInTheDocument();
  expect(screen.getAllByRole("img", { name: /^Agente / }).length).toBeGreaterThanOrEqual(6);
});
```
- [ ] **Step 2:** FAIL. **Step 3:** reescrever a home como a Tela 1 da maquete: chamada "Trilha nova: do zero ao seu app no ar", título `.title-display` "Tire suas ideias **do papel.**" (menta), subtítulo, botões "Começar agora →" (menta, vai para `/inicio`) e "Ver a trilha", palco com os seis agentes (Julgamento ao centro, maior) e a legenda "**Seis especialistas, seis passos.** Tu monta o teu time no caminho.". Rodapé sem "aprenda programação". Header: logo com o agente Julgamento pequeno + "studymaps" em Archivo. **Step 4:** suíte → PASS. **Step 5: Commit** — `feat(home): o palco com o time de agentes`

### Task A4: Mapa da trilha — as cartas do time

**Files:** `src/pages/RoadmapViewer.tsx`, `src/components/roadmap/TrailMap.tsx`, `TrailList.tsx`, `MapDrawer.tsx`; Test `src/pages/pages.smoke.test.tsx`

- [ ] **Step 1: Testes que falham (inclui Review Focus 7 e a Tarefa 3)**
```ts
it("a trilha mostra o teu time", () => {
  renderAt(TRILHA);
  expect(screen.getByText(/SEU TIME/i)).toBeInTheDocument();
  expect(screen.getByText("0/6")).toBeInTheDocument();
});
it("o mapa vem antes do cartão da prova", () => {
  renderAt(TRILHA);
  const mapa = screen.getByRole("tablist", { name: "Modo de visualização" });
  const prova = screen.getByLabelText("Link do seu projeto publicado");
  expect(mapa.compareDocumentPosition(prova) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
```
mais o teste da Tarefa 3 ("a lista da trilha mostra a dor").
- [ ] **Step 2:** FAIL. **Step 3:** como a Tela 2: título `.title-display`, rótulo mono "TRILHA 01", caixa "SEU TIME x/6" com os seis agentes pequenos (`teamStatus`; bloqueado = silhueta com cadeado). No mapa, cada **fase** vira uma carta com o agente dela, número mono "01"–"06", ✓ quando recrutado, borda roxa com brilho na fase atual e "VOCÊ ESTÁ AQUI"; aulas com o título e a dor (Tarefa 3). Rota em linha fina; trecho percorrido em menta. Cartão da prova e link do certificado **depois** do mapa. **Step 4:** suíte → PASS; conferir no navegador em 1280px e 375px. **Step 5: Commit** — `feat(trilha): mapa com as cartas do time e a dor de cada aula`

### Task A5: A aula no visual novo

**Files:** `src/pages/LessonView.tsx`, `src/components/lesson/LessonStepper.tsx`, `StepSection.tsx`, `QuestionInputs.tsx`, `ContentRenderer.tsx` (classes), mais tudo da **Tarefa 2**.

- [ ] Executar a **Tarefa 2** inteira (componentes da dor) consumindo `Agent`/`agentForPhase` da A2.
- [ ] Além dela: barra do topo com ✕, os passos como pílulas finas (feitas em menta, atual em roxo) e o XP em mono; rótulo mono "04 · JULGAMENTO · AULA 1/3"; título `.title-display`; seções com número mono ("01 · OLHA ANTES DE EU EXPLICAR"); opções de resposta com a letra num quadrado (como a maquete); botões menta. Smoke existente da aula continua verde. **Commit** — `feat(aula): a aula no visual dos agentes`

### Task A6: As demais telas

**Files:** `src/pages/Dashboard.tsx`, `Onboarding.tsx`, `CertificateView.tsx`, `ReviewView.tsx`, `ProjectsView.tsx`, `NotFound.tsx`, `src/components/gamification/*`

- [ ] Mesma linguagem: títulos `.title-display`, rótulos mono, cartões `#120C26` com borda `#2E2357`, ação em menta. Painel com o time (`teamStatus`) no topo no lugar do destaque antigo; certificado com o agente No ar. Todo smoke test segue verde. **Commit** — `feat: painel, certificado e demais telas no visual dos agentes`

### Task A7: Conferência visual

- [ ] Percorrer início, trilha (mapa e lista), aula, painel, onboarding, certificado, revisão e 404 em 1280px e 375px. Em cada uma: nada de neon, quadriculado ou degradê; sem rolagem horizontal; o texto legível (contraste do secundário `#A99CD6` sobre `#0B0717`).

---

### Task 1: A dor no modelo, os títulos em "tu" e a tabela como teste

**Files:**
- Modify: `src/content/types.ts` (novo `LessonPain`, campo `Lesson.pain`)
- Modify: `src/content/draft.ts` (aceitar `painQuote`)
- Modify: `src/content/trails/app-no-ar.ts` (títulos em "tu" e `painQuote` em todo `draftLesson`; `pain` completo na 4.1 entra só na Tarefa 4)
- Modify: `src/content/curriculum.test.ts` (tabela, invariantes, teste de imagens relaxado)

**Interfaces:**
- Produces:
  ```ts
  export interface LessonPain {
    /** A dor, em primeira pessoa, sem aspas. É também o "antes" do fim. */
    quote: string;
    /** O que resolve, numa frase. Obrigatório em aula available (teste). */
    resolve?: string;
    /** Uma linha com o ganho concreto. Opcional sempre. */
    resolveDetail?: string;
    /** A mesma pessoa depois da aula. Obrigatório em aula available (teste). */
    after?: string;
  }
  // Lesson ganha: pain?: LessonPain
  // draftLesson(input) passa a aceitar painQuote?: string → pain: { quote: painQuote }
  ```
  No teste: `const DORES: Record<string, { titulo: string; quote: string; resolve: string; after: string }>` com as 12 linhas da tabela acima, verbatim.

- [ ] **Step 1: Escrever os testes que falham**

```ts
describe("dor → solução", () => {
  const trilha = flattenLessons(getTrail("app-no-ar")!).map((l) => l.lesson);

  it("toda aula da Trilha 1 tem a dor, para o mapa mostrar", () => {
    for (const l of trilha) expect(l.pain?.quote?.trim(), l.id).toBeTruthy();
  });

  it("as dores não se repetem", () => {
    const qs = trilha.map((l) => l.pain!.quote);
    expect(new Set(qs).size).toBe(qs.length);
  });

  it("título e dor de cada aula batem com a tabela aprovada", () => {
    for (const l of trilha) {
      expect(l.title, l.id).toBe(DORES[l.id].titulo);
      expect(l.pain!.quote, l.id).toBe(DORES[l.id].quote);
    }
  });

  it("aula available tem a dor completa e igual à tabela", () => {
    for (const l of trilha.filter((x) => x.status === "available")) {
      expect(l.pain?.resolve, l.id).toBe(DORES[l.id].resolve);
      expect(l.pain?.after, l.id).toBe(DORES[l.id].after);
    }
  });

  it("a dor vai sem aspas — quem desenha as aspas é o componente", () => {
    for (const l of trilha) expect(l.pain!.quote, l.id).not.toMatch(/^["“]|["”]$/);
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/content/curriculum.test.ts`
Expected: FAIL — `pain` não existe; títulos ainda em "você".

- [ ] **Step 3: Adicionar `LessonPain` e `Lesson.pain` em `types.ts`; `painQuote` em `draftLesson`**

- [ ] **Step 4: Em `app-no-ar.ts`, trocar os títulos pelos da tabela e passar `painQuote` em cada `draftLesson`**

A aula 4.1 (`oQueFazParecerGenerico`) ainda é `available` sem `pain` completo: o teste "aula available tem a dor completa" vai falhar para ela até a Tarefa 4. Para a suíte ficar verde nesta tarefa, dar à 4.1 agora só o `pain` verbatim da tabela (quote, resolve, after) e o título dela da tabela — o resto da conversão é a Tarefa 4.

- [ ] **Step 5: Relaxar o teste de imagens (spec §10.2)**

Em `describe("imagens de conteúdo")`, trocar a exigência por aula (`srcs.length > 0` dentro do laço) por: toda imagem referenciada existe **e**, no total da trilha, há pelo menos uma imagem (para o teste não passar vazio).

- [ ] **Step 6: Rodar tudo e o typecheck**

Run: `npm run test && npx tsc -p tsconfig.app.json --noEmit`
Expected: PASS

- [ ] **Step 7: Commit** — `feat(content): a dor de cada aula no modelo, conferida contra a tabela aprovada`

---

### Task 2: Os componentes da dor e os agentes na aula

**Files:**
- Create: `src/components/agents/Agent.tsx` — os seis agentes + bloqueado, portados de `docs/superpowers/specs/mockups/telas-agentes.html` (os `<symbol>` viram JSX; mesmo desenho, mesmas cores)
- Create: `src/lib/agents.ts`
- Create: `src/components/lesson/pain/PainCard.tsx`, `ResolveCard.tsx`, `PainResolved.tsx`
- Modify: `src/pages/LessonView.tsx` (cartões no topo, abaixo do título; "dor resolvida" depois do checkpoint)
- Test: `src/components/lesson/pain/pain.test.tsx`, `src/lib/agents.test.ts`

**Interfaces:**
- Consumes: `LessonPain` (Tarefa 1).
- Produces:
  ```ts
  // src/lib/agents.ts
  export type AgentKind = "ideia" | "pedido" | "geracao" | "julgamento" | "conserto" | "noar";
  export const AGENTS: Record<AgentKind, { label: string; color: string }>;
  export function agentForPhase(phaseId: string): AgentKind | null;  // ar-p1..ar-p6 → na ordem; resto → null

  // componentes
  export function Agent(props: { kind: AgentKind | "bloqueado"; size?: number; title?: string }): JSX.Element;
  export function PainCard(props: { quote: string }): JSX.Element;
  export function ResolveCard(props: { resolve: string; detail?: string; agent: AgentKind | null }): JSX.Element;
  export function PainResolved(props: { before: string; after: string; agent: AgentKind | null }): JSX.Element;
  ```
  Textos fixos, verbatim da maquete: rótulos "A DOR", "O QUE RESOLVE", "DOR RESOLVIDA", "ANTES", "AGORA"; linha da dor "Se isso já aconteceu contigo, essa aula é tua."; cabeçalho do fecho com o agente: "✓ {LABEL} NO TIME" (ex.: "✓ JULGAMENTO NO TIME").

- [ ] **Step 1: Escrever os testes que falham (inclui Review Focus 1, 2 e 3)**

```ts
// agents.test.ts
it("cada fase da Trilha 1 tem seu agente, na ordem do loop", () => {
  expect(["ar-p1","ar-p2","ar-p3","ar-p4","ar-p5","ar-p6"].map(agentForPhase))
    .toEqual(["ideia","pedido","geracao","julgamento","conserto","noar"]);
});
it("fase fora da Trilha 1 não tem agente", () => {
  expect(agentForPhase("fe-p1")).toBeNull();
});

// pain.test.tsx
it("PainCard mostra a dor entre aspas e o convite", () => {
  render(<PainCard quote="Tá pronto, mas ninguém consegue ver." />);
  expect(screen.getByText("A DOR")).toBeInTheDocument();
  expect(screen.getByText(/Tá pronto, mas ninguém consegue ver\./)).toBeInTheDocument();
  expect(screen.getByText("Se isso já aconteceu contigo, essa aula é tua.")).toBeInTheDocument();
});
it("ResolveCard sem detalhe não desenha linha vazia", () => {
  const { container } = render(<ResolveCard resolve="Dar nome ao defeito." agent="julgamento" />);
  expect(container.querySelectorAll("p").length).toBe(2); // rótulo + frase
});
it("ResolveCard sem agente ainda renderiza", () => {
  render(<ResolveCard resolve="Dar nome ao defeito." agent={null} />);
  expect(screen.getByText("Dar nome ao defeito.")).toBeInTheDocument();
});
it("PainResolved mostra antes e agora", () => {
  render(<PainResolved before="Achei feio." after="Três botões brigando." agent="julgamento" />);
  expect(screen.getByText("ANTES")).toBeInTheDocument();
  expect(screen.getByText(/Três botões brigando\./)).toBeInTheDocument();
  expect(screen.getByText(/JULGAMENTO NO TIME/)).toBeInTheDocument();
});
```

E no `pages.smoke.test.tsx`:

```ts
it("aula escrita abre pela dor e fecha com antes e agora", () => {
  renderAt(AULA);
  expect(screen.getByText("A DOR")).toBeInTheDocument();
  expect(screen.getByText("O QUE RESOLVE")).toBeInTheDocument();
  expect(screen.getByText("DOR RESOLVIDA")).toBeInTheDocument();
});
it("aula em rascunho não desenha cartões vazios", () => {
  renderAt(`${TRILHA}/aula/ar-jul-02-checklist`);
  expect(screen.getByText("Conteúdo em produção")).toBeInTheDocument();
  expect(screen.queryByText("O QUE RESOLVE")).not.toBeInTheDocument();
  expect(screen.queryByText("DOR RESOLVIDA")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/lib/agents.test.ts src/components/lesson/pain src/pages/pages.smoke.test.tsx`
Expected: FAIL — módulos inexistentes.

- [ ] **Step 3: Implementar `agents.ts` e `Agent.tsx`**

`Agent` usa um `<svg>` por chamada com o desenho da maquete; o `<use href="#sombra">`/`#olhos` da maquete vira JSX inline (sem ids globais, para não colidir quando houver vários agentes na tela).

- [ ] **Step 4: Implementar os três cartões na paleta da spec §9**

Desenho e espaçamento da maquete `aula-dor-solucao.html`: dor em fundo `#1D0F2E`→`#150B26`, borda `#3A1B4A`, aspas e rótulo em `#FF6B8A`; "o que resolve" em fundo `#0F1E1A`, borda `#1C4A3B`, rótulo `#3DF5B0`; "dor resolvida" com duas colunas que viram uma abaixo de `sm`. Texto da dor com `break-words`.

- [ ] **Step 5: Montar na `LessonView`**

Logo abaixo do título da aula, e só quando `lesson.status === "available"` e `lesson.pain?.resolve` existe: `PainCard` + `ResolveCard` (agente = `agentForPhase(phase.id)`). "Dor resolvida" depois da seção do checkpoint, só com `pain.after`. Aula `draft` segue como hoje.

- [ ] **Step 6: Rodar tudo e o typecheck**

Run: `npm run test && npx tsc -p tsconfig.app.json --noEmit`
Expected: PASS

- [ ] **Step 7: Commit** — `feat(aula): a aula abre pela dor e fecha com o antes e o agora`

---

### Task 3: A dor no mapa e na lista

**Files:**
- Modify: `src/components/roadmap/TrailList.tsx:70-80`
- Modify: `src/components/roadmap/MapDrawer.tsx:60-80,190-205`
- Test: `src/pages/pages.smoke.test.tsx`

**Interfaces:**
- Consumes: `Lesson.pain.quote` (Tarefa 1).

- [ ] **Step 1: Escrever o teste que falha**

```ts
it("a lista da trilha mostra a dor que cada aula resolve", () => {
  renderAt(TRILHA);
  fireEvent.click(screen.getByRole("tab", { name: "Lista" }));
  expect(screen.getByText(/Toda vez eu aceito o primeiro resultado que vem\./)).toBeInTheDocument();
  expect(screen.getAllByText(/resolve:/).length).toBeGreaterThanOrEqual(12);
});
```

- [ ] **Step 2: Rodar e confirmar que falha** — `npm run test -- src/pages/pages.smoke.test.tsx` → FAIL, texto ausente.

- [ ] **Step 3: Mostrar `resolve: “{quote}”` embaixo do título** na `TrailList` e no painel da aula do `MapDrawer`, no lugar do `summary` quando houver dor (a dor diz mais que o resumo). "resolve:" em `#A99CD6`, a frase em `#FF8FA6`.

- [ ] **Step 4: Rodar tudo** — `npm run test && npx tsc -p tsconfig.app.json --noEmit` → PASS.

- [ ] **Step 5: Commit** — `feat(trilha): o mapa mostra a dor que cada aula resolve`

---

### Task 4: Converter a 4.1 — o molde

**Files:**
- Modify: `src/content/lessons/ar-julgamento-01-generico.ts`
- Test: `src/content/curriculum.test.ts`

**Interfaces:**
- Consumes: `LessonPain` (Tarefa 1), componentes (Tarefa 2).
- Produces: **o molde** que as Tarefas 5–15 seguem. Ordem do `content`: a prova (comparação, "olha antes de eu explicar") → a ferramenta (nomes, teste) → o resto. A dor, o "o que resolve" e o "agora" vivem em `pain`, não no `content`.

- [ ] **Step 1: Escrever o teste que falha (Review Focus 4)**

```ts
it("aula available fala com 'tu', nunca com 'você'", () => {
  for (const l of trilha.filter((x) => x.status === "available")) {
    const texto = JSON.stringify(l);
    expect(texto, l.id).not.toMatch(/\bvocê(s)?\b/i);
  }
});
```

- [ ] **Step 2: Rodar e confirmar que falha** — FAIL: a 4.1 está em "você".

- [ ] **Step 3: Reescrever a 4.1 em "tu", no molde**

- `pain.resolveDetail`: "“Meio feio” a IA não entende. “Três botões brigando” ela arruma em segundos." (verbatim da maquete).
- Primeiro bloco de conteúdo: a comparação, com o título "O mesmo produto, dois pedidos" e o texto "Repara pra onde o teu olho vai primeiro em cada um. Não lê ainda — só olha."
- Os blocos "Por que o resultado da IA parece sempre o mesmo" e a analogia da comida saem: a dor já cumpre esse papel.
- **Exercício novo (spec §10.3):** "Nomeia os defeitos de um resultado teu que tu já tinha aceitado" — é o desafio de hoje, promovido. **Desafio novo:** "Reescreve o pedido daquele resultado usando os nomes que tu achou." A "versão feia de propósito" sai daqui; ela é a 4.3.
- Perguntas, checkpoint, recursos e premium: mantêm conteúdo e URLs (já verificados), texto passado para "tu".

- [ ] **Step 4: Rodar tudo** — `npm run test && npx tsc -p tsconfig.app.json --noEmit` → PASS.

- [ ] **Step 5: Abrir no navegador e comparar com a maquete**

`npm run dev`, abrir `/roadmap/app-no-ar/aula/ar-jul-01-generico`. Conferir: abre pela dor, "o que resolve" com o agente Julgamento, fecha com antes/agora.

- [ ] **Step 6: Commit** — `feat(content): aula 4.1 no formato dor → solução, em "tu"`

---

## Receita de aula (Tarefas 5 a 15)

Cada uma das onze tarefas abaixo segue estes passos, com os dados da própria tarefa.

- [ ] **Step 1: Escrever o teste que falha**

```ts
it("<id> está escrita", () => {
  const l = getLessonLocation("app-no-ar", "<id>")!.lesson;
  expect(l.status).toBe("available");
});
```

Todo o resto — dor igual à tabela, "tu", ≥3 perguntas, exercício, checkpoint, recursos, imagens existentes — já é cobrado pelos testes das Tarefas 1 e 4 e pelos invariantes que existiam.

- [ ] **Step 2: Rodar e confirmar que falha** — FAIL: `status` é `"draft"`.

- [ ] **Step 3: Verificar cada fato e cada URL antes de escrever**

Abrir cada URL que a aula vai citar e confirmar título, autor/fornecedor, que é o que se diz que é, e se é gratuito. Descartar 404 e redirecionamento para outra coisa. Confirmar todo fato sobre ferramenta que a aula afirma (nome de modo, existência de plano grátis). **Se um fato da tabela de dores não se confirmar, parar e reportar** (Global Constraints).

- [ ] **Step 4: Escrever `src/content/lessons/<arquivo>.ts` seguindo a 4.1 convertida**

Em "tu". `pain` verbatim da tabela + `resolveDetail` próprio. Conteúdo: prova primeiro, depois a ferramenta. ≥3 perguntas com `concept` e dica; exercício com `selfCheck` de 4–5 itens; checkpoint com ≥3 perguntas e `passThreshold` 2; desafio opcional. ≥1 recurso grátis verificado; premium só com `reason` e verificado.

- [ ] **Step 5: Trocar o `draftLesson` correspondente em `app-no-ar.ts` pelo export da aula**

- [ ] **Step 6: Rodar tudo** — `npm run test && npx tsc -p tsconfig.app.json --noEmit` → PASS.

- [ ] **Step 7: Commit** — `feat(content): aula <n.n> "<título>"`

---

### Task 5: 1.1 — Recorta a ideia até ela caber

**Arquivo:** `src/content/lessons/ar-ideia-01-recortar.ts` · **export:** `recortaAIdeia` · **fase:** `ar-p1` (agente Ideia)

- **Prova:** antes/depois em texto (bloco `example`): "app de academia com treino, dieta, comunidade e loja" → "uma tela onde o aluno marca o treino de hoje".
- **Ferramenta:** ideia grande é uma lista, não uma coisa; a pergunta "quem usa e o que essa pessoa faz na primeira vez?"; cortar até sobrar **uma** ação principal; a régua "cabe num fim de semana".
- **Exercício:** escrever a própria ideia numa frase, listar tudo que ela tem, cortar até uma ação.
- **Recursos a procurar e verificar:** material confiável e gratuito sobre MVP / primeira versão (ex.: biblioteca da Y Combinator).

### Task 6: 1.2 — Junta cinco referências

**Arquivo:** `src/content/lessons/ar-ideia-02-referencias.ts` · **export:** `juntaCincoReferencias` · **fase:** `ar-p1`

- **Prova:** referência sem anotação ("gostei desse") vs. com anotação ("o espaço entre as seções desse; a cor de botão daquele").
- **Ferramenta:** onde procurar (Pinterest, apps e sites que tu usa, galerias de interface); por que cinco; anotar **o que** tu quer de cada uma; nunca copiar o todo.
- **Exercício:** moodboard de cinco referências, uma linha de anotação cada.
- **Recursos:** página oficial de cada lugar de busca citado; conferir o que é gratuito.

### Task 7: 2.1 — Escreve o briefing antes do prompt

**Arquivo:** `src/content/lessons/ar-spec-01-briefing.ts` · **export:** `escreveOBriefing` · **fase:** `ar-p2` (agente Pedido)

- **Prova:** o pedido de uma linha vs. o briefing de meia página, lado a lado em `example`.
- **Ferramenta:** as cinco partes — pra quem é, a ação principal, o que tem na tela, o que **não** entra, as referências. Adivinhação gera média.
- **Exercício:** escrever o briefing da ideia recortada na 1.1.
- **Recursos (já verificados em 29/10, reconferir):** `docs.lovable.dev/prompting/prompting-one`; `platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview`.

### Task 8: 2.2 — Usa a IA pra melhorar teu pedido

**Arquivo:** `src/content/lessons/ar-spec-02-co-autoria.ts` · **export:** `usaAIaProPedido` · **fase:** `ar-p2`

- **Prova:** gerar direto e descobrir a falta depois vs. "antes de gerar, me faz as perguntas que faltam" e responder antes.
- **Ferramenta:** o pedido de perguntas; responder e só então gerar; o modo de planejar/conversar da ferramenta (confirmar o nome atual na documentação do Lovable antes de citar).
- **Exercício:** pedir as perguntas sobre o briefing da 2.1 e responder todas.
- **Recursos:** documentação oficial do Lovable sobre o modo de planejar/chat; documentação do Claude.

### Task 9: 3.1 — A ferramenta certa pra cada pedaço

**Arquivo:** `src/content/lessons/ar-ger-01-ferramenta-certa.ts` · **export:** `aFerramentaCerta` · **fase:** `ar-p3` (agente Geração)

- **Prova:** o mapa ferramenta → pedaço do projeto (bloco `list` ou `example`): pensar e escrever (Claude, ChatGPT, Gemini), construir a tela (Lovable), referência (Pinterest), publicar (GitHub, Vercel/Render).
- **Ferramenta:** o que cada uma faz melhor; o que entregar junto do pedido (briefing + referências).
- **Exercício:** dividir o próprio projeto em pedaços e escrever qual ferramenta pega cada um.
- **Recursos:** página oficial de cada ferramenta citada. **Não afirmar preço.** Só afirmar "tem plano grátis" se confirmado na página oficial.

### Task 10: 4.2 — Teu checklist de julgamento

**Arquivo:** `src/content/lessons/ar-julgamento-02-checklist.ts` · **export:** `teuChecklist` · **fase:** `ar-p4` (agente Julgamento)

- **As seis perguntas, nesta ordem:** pra onde o olho vai primeiro? · qual é a **uma** ação? · o texto diz o que é isso, ou serve pra qualquer um? · o espaço separa o que é diferente? · quantas cores competem? · no celular, ainda funciona?
- **Prova:** passar o checklist num resultado e mostrar cada resposta.
- **Obrigatório:** pelo menos uma questão `judge`.
- **Exercício:** passar o checklist no último resultado gerado e anotar as seis respostas.
- **Recursos (verificados em 29/10, reconferir):** NN/g "5 Principles of Visual Design in UX"; NN/g "Squint Test".

### Task 11: 4.3 — Faz a versão feia de propósito

**Arquivo:** `src/content/lessons/ar-julgamento-03-feio.ts` · **export:** `fazAVersaoFeia` · **fase:** `ar-p4`

- **É aqui** que entra o exercício que saiu da 4.1: gerar o preguiçoso de propósito, guardar, nomear 3 a 5 defeitos, reescrever o pedido, gerar de novo, comparar.
- **Prova:** o par preguiçoso × consertado, em texto ou com as ilustrações já existentes em `public/content/app-no-ar/`.
- **Obrigatório:** pelo menos uma questão `judge`.
- **Recursos:** reaproveitar os verificados da fase 4 ou novos, verificados.

### Task 12: 5.1 — Pede a correção, não outra tentativa

**Arquivo:** `src/content/lessons/ar-conserto-01-iteracao.ts` · **export:** `pedeACorrecao` · **fase:** `ar-p5` (agente Conserto)

- **Prova:** "melhora o topo" vs. "no topo, aumenta o título pro dobro do tamanho do parágrafo; não mexe em mais nada".
- **Ferramenta:** um ajuste por vez; defeito com nome + onde + o que **não** mexer; usar o histórico de versões para voltar (confirmar como funciona na documentação do Lovable); quando vale recomeçar de verdade.
- **Exercício:** pegar um defeito nomeado na fase 4 e escrever o pedido de conserto nos três elementos.
- **Recursos:** documentação oficial do Lovable sobre edição e histórico.

### Task 13: 6.1 — GitHub: onde teu projeto passa a existir

**Arquivo:** `src/content/lessons/ar-pub-01-github.ts` · **export:** `githubOndeExiste` · **fase:** `ar-p6` (agente No ar)

- **Prova:** projeto só no preview vs. projeto com repositório e histórico (em texto).
- **Ferramenta:** o que é repositório, commit e histórico; conectar o Lovable ao GitHub (passo a passo **pela documentação oficial**, sem print); conta gratuita.
- **Exercício:** conectar o próprio projeto a um repositório e ver o primeiro commit.
- **Recursos:** GitHub Docs sobre repositórios; documentação do Lovable sobre a integração com GitHub.

### Task 14: 6.2 — Vercel ou Render: a decisão

**Arquivo:** `src/content/lessons/ar-pub-02-vercel-render.ts` · **export:** `vercelOuRender` · **fase:** `ar-p6`

- **Prova:** dois projetos lado a lado: um só de tela (→ Vercel), um com backend e banco (→ Render).
- **Ferramenta:** a pergunta "teu app tem backend e banco?"; o que é build; o que o plano grátis de cada um cobre e seus limites, **só o que estiver confirmado** nas páginas oficiais.
- **Atenção (Review Focus 6):** a tabela aprovada afirma "Nos dois, plano grátis" e "de graça". Confirmar nas páginas oficiais de Vercel e Render **antes** de escrever. Se não se confirmar, parar e reportar.
- **Recursos:** documentação oficial da Vercel e da Render.

### Task 15: 6.3 — No ar, com link pra mandar

**Arquivo:** `src/content/lessons/ar-pub-03-no-ar.ts` · **export:** `noArComLink` · **fase:** `ar-p6`

- **Prova:** o link que só abre no teu computador vs. o que abre em aba anônima e no celular de outra pessoa.
- **Ferramenta:** deploy ligado ao repositório; variáveis de ambiente — o que **nunca** vai para o repositório (chaves); testar em aba anônima e em outro aparelho; registrar o link no StudyMaps (o cartão da prova, que destrava o certificado).
- **Exercício:** publicar, abrir o link no celular de alguém, registrar o link.
- **Recursos:** documentação oficial de variáveis de ambiente da Vercel e da Render.

---

### Task 16: Verificação final

- [ ] **Step 1:** `npm run test && npx tsc -p tsconfig.app.json --noEmit && npm run build` → tudo verde; build sem erro.
- [ ] **Step 2:** `npm run dev`; percorrer as 12 aulas na ordem da trilha. Em cada uma: abre pela dor, fecha com antes/agora, agente certo da fase, nenhum "você".
- [ ] **Step 3 (Review Focus 5):** em 375px, abrir a aula de dor mais longa (4.1) e conferir: a dor quebra linha e a página não rola na horizontal (`document.documentElement.scrollWidth === clientWidth`).
- [ ] **Step 4:** o certificado continua dizendo "Esta trilha ainda está sendo escrita"? Com as 12 escritas, **não** — ele passa a poder ser emitido. Conferir que `/certificado/app-no-ar` agora lista as lacunas da pessoa (aulas, link, nome) em vez da trilha.
- [ ] **Step 5: Commit** do que a verificação tiver ajustado.

## Fora deste plano

- Trilhas 2, 3 e 4.
- Push e PR.
