# Virada do StudyMaps para trilhas de entrega — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o StudyMaps de plataforma de roadmaps de código em plataforma de trilhas de entrega com IA, com a máquina pronta e a primeira aula escrita de ponta a ponta como prova.

**Architecture:** O modelo de conteúdo (Trilha → Fase → Etapa → Aula) é preservado e estendido, não reescrito. Três adições ao modelo — blocos visuais de comparação, questão de julgamento A/B e registro da prova publicada — mais a troca do currículo: as trilhas de código saem do array `curriculum` para `src/content/archive/` e entra a Trilha 1, cujas seis fases são os seis passos do loop. Progresso antigo é migrado aditivamente (v3 → v4), sem apagar XP, conquistas nem sequência.

**Tech Stack:** Vite 5, React 18, TypeScript 5.8, Tailwind 3.4, React Router 6, Framer Motion, Vitest 3 + Testing Library, `localStorage` via `StorageAdapter`.

**Spec:** [`docs/superpowers/specs/2026-10-28-studymaps-ia-design.md`](../specs/2026-10-28-studymaps-ia-design.md)

## Global Constraints

- Nada de inventar dados: nenhum `FreeResource`, `RecommendedVideo` ou `PremiumResource` entra sem URL verificada por acesso real. `PremiumResource.reason` é obrigatório; campos de preço, duração e nota não existem e não devem ser criados (spec §4.5, §10).
- `durationLabel` só é preenchido quando o valor é realmente conhecido.
- Todo texto de interface e de conteúdo em pt-BR.
- A trilha tem de ser concluível no plano grátis das ferramentas; se o limite gratuito não permitir chegar ao link publicado, a aula nomeia alternativa gratuita (spec §10, §12.4).
- Aula de ferramenta ensina conceito e manda para a documentação oficial no passo a passo; proibido passo a passo baseado em captura de tela de UI de terceiro (spec §4.4, anti-objetivo §5).
- Imagens de comparação são arquivos em `public/`, nunca URL remota (spec §12.5).
- O progresso de quem já usou o app não é descartado: XP, conquistas e sequência sobrevivem (spec §12.7).
- Nenhum backend, login ou conta nesta versão (spec §5).
- Aula `status: "draft"` nunca trava a navegação e não tem perguntas de checkpoint.
- `npm run test` e `npx tsc --noEmit` passam ao fim de cada tarefa.

## Review Focus

Entradas que a spec implica e que nenhum teste de tarefa exercitaria por conta própria. Cada linha tem seu teste atribuído à tarefa que é dona do código.

1. **Blob de progresso v3 já salvo no navegador de quem usou o app publicado** — os campos novos (`checklists`, `proofs`) caem no default e o XP, conquistas e sequência continuam intactos. → Tarefa 4, Passo 1.
2. **Entradas de aulas que não existem mais no blob migrado** (`lessons["fe-html-01-tags"]`) — não quebram nenhum seletor nem contam como aula concluída. → Tarefa 6, Passo 6.
3. **Rota antiga `/roadmap/frontend` de link compartilhado ou favorito** — redireciona, não cai em 404. → Tarefa 6, Passo 3.
4. **Bloco `compare` cuja imagem não existe em `public/`** — a aula renderiza o resto do conteúdo e mostra a legenda, sem tela branca. → Tarefa 2, Passo 7.
5. **Questão `judge` respondida pela metade** (escolheu o melhor, não marcou defeito nenhum) — não pode ser submetida. → Tarefa 3, Passo 5.

---

### Task 1: Abrir `TrailId` para as trilhas novas

**Files:**
- Modify: `src/content/types.ts:13`
- Test: `src/content/curriculum.test.ts`

**Interfaces:**
- Produces: `TrailId` passa a aceitar `"app-no-ar" | "site-com-sua-cara" | "tarefa-chata" | "projeto-de-verdade"` além de `"frontend" | "backend" | "fullstack"` (estes últimos permanecem no tipo porque os arquivos arquivados na Tarefa 6 continuam tipados).

- [ ] **Step 1: Escrever o teste que falha**

Em `src/content/curriculum.test.ts`, substituir o teste `"tem as três trilhas na ordem esperada"` por:

```ts
it("a trilha de entrega principal é a primeira do currículo", () => {
  expect(curriculum[0].id).toBe("app-no-ar");
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/content/curriculum.test.ts`
Expected: FAIL — `curriculum[0].id` é `"frontend"`.

- [ ] **Step 3: Ampliar o tipo `TrailId` em `src/content/types.ts`**

Union dos sete ids, com comentário marcando os três legados como arquivados (voltam na Tarefa 6). Só o tipo muda nesta tarefa; o currículo ainda não.

- [ ] **Step 4: Rodar `npx tsc --noEmit`**

Expected: sem erros. O teste do Passo 1 continua falhando — é esperado, ele fecha na Tarefa 5.

- [ ] **Step 5: Commit**

```bash
git add src/content/types.ts src/content/curriculum.test.ts
git commit -m "refactor(content): abre TrailId para as trilhas de entrega"
```

---

### Task 2: Blocos de conteúdo `image` e `compare`

O bloco que a tese central depende (spec §4.2, §7.3, §12.5).

**Files:**
- Modify: `src/content/types.ts` (union `ContentBlock`)
- Modify: `src/components/lesson/ContentRenderer.tsx:43-99`
- Test: `src/components/lesson/content-blocks.test.tsx` (criar)

**Interfaces:**
- Produces:
  ```ts
  type ContentBlock =
    | /* …os existentes… */
    | { type: "image"; src: string; alt: string; caption?: string }
    | { type: "compare"; title?: string;
        left:  { src: string; alt: string; label: string; caption?: string };
        right: { src: string; alt: string; label: string; caption?: string } }
  ```
  `src` é caminho a partir da raiz pública (ex.: `/content/app-no-ar/julgamento-ruim.png`).

- [ ] **Step 1: Escrever os testes que falham**

```tsx
it("renderiza um bloco image com alt e legenda", () => {
  render(<ContentRenderer blocks={[{ type: "image", src: "/content/x.png", alt: "Tela gerada", caption: "Primeira tentativa" }]} />);
  expect(screen.getByAltText("Tela gerada")).toBeInTheDocument();
  expect(screen.getByText("Primeira tentativa")).toBeInTheDocument();
});

it("renderiza um bloco compare com os dois lados e seus rótulos", () => {
  render(<ContentRenderer blocks={[{ type: "compare",
    left:  { src: "/a.png", alt: "Versão sem referência", label: "Sem referência" },
    right: { src: "/b.png", alt: "Versão com referência", label: "Com referência" } }]} />);
  expect(screen.getByAltText("Versão sem referência")).toBeInTheDocument();
  expect(screen.getByAltText("Versão com referência")).toBeInTheDocument();
  expect(screen.getByText("Sem referência")).toBeInTheDocument();
  expect(screen.getByText("Com referência")).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/components/lesson/content-blocks.test.tsx`
Expected: FAIL — os tipos não existem e o `switch` não trata os casos.

- [ ] **Step 3: Adicionar os dois membros à union `ContentBlock` em `src/content/types.ts`**

- [ ] **Step 4: Tratar `case "image"` e `case "compare"` no `switch` de `ContentRenderer.tsx`**

`compare` é grid de duas colunas que colapsa para uma coluna abaixo de `md`, seguindo o padrão de borda e card já usado nos outros blocos do arquivo. Rótulo de cada lado acima da imagem; legenda abaixo. Imagens com `loading="lazy"`.

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npm run test -- src/components/lesson/content-blocks.test.tsx`
Expected: PASS

- [ ] **Step 6: Escrever o teste do Review Focus nº 4 (imagem ausente)**

```tsx
it("bloco compare com imagem inexistente ainda mostra o resto do conteúdo", () => {
  render(<ContentRenderer blocks={[
    { type: "compare",
      left:  { src: "/nao-existe-a.png", alt: "A", label: "Sem referência" },
      right: { src: "/nao-existe-b.png", alt: "B", label: "Com referência" } },
    { type: "paragraph", text: "Repare no espaçamento." },
  ]} />);
  expect(screen.getByText("Repare no espaçamento.")).toBeInTheDocument();
  expect(screen.getByText("Sem referência")).toBeInTheDocument();
});
```

- [ ] **Step 7: Rodar e confirmar que passa**

Run: `npm run test -- src/components/lesson/content-blocks.test.tsx`
Expected: PASS. Se falhar, garantir que a imagem quebrada não derruba o container (sem `onError` que desmonte o bloco).

- [ ] **Step 8: Commit**

```bash
git add src/content/types.ts src/components/lesson/ContentRenderer.tsx src/components/lesson/content-blocks.test.tsx
git commit -m "feat(content): blocos image e compare para comparação visual"
```

---

### Task 3: Questão de julgamento `judge`

Duas partes, as duas de escolha, corrigível pelo pipeline atual (spec §7.3, §12.2).

**Files:**
- Modify: `src/content/types.ts` (union `Question`, `QuestionAnswer`, `QuestionType`)
- Modify: `src/lib/questions.ts:12-62` (`emptyAnswer`, `isAnswerComplete`, `gradeQuestion`)
- Modify: `src/components/lesson/QuestionInputs.tsx`
- Test: `src/lib/questions.test.ts`

**Interfaces:**
- Consumes: blocos de imagem da Tarefa 2 (mesma convenção de `src`).
- Produces:
  ```ts
  interface JudgeQuestion extends QuestionBase {
    type: "judge";
    left:  { src?: string; alt?: string; label: string; body?: string };
    right: { src?: string; alt?: string; label: string; body?: string };
    /** Qual lado é o melhor. */
    better: "left" | "right";
    /** Defeitos candidatos do lado pior. */
    defects: { id: string; text: string }[];
    /** Subconjunto de `defects` que de fato se aplica. Pelo menos 1. */
    correctDefectIds: string[];
  }
  type QuestionAnswer = /* …as existentes… */
    | { kind: "judge"; better: "left" | "right" | null; defectIds: string[] };
  ```
  `gradeQuestion` devolve `true` só quando o lado **e** o conjunto de defeitos estão certos.

- [ ] **Step 1: Escrever os testes que falham**

```ts
const judge: JudgeQuestion = {
  id: "q-judge", type: "judge", prompt: "Qual versão está melhor?",
  concept: "hierarquia visual", skill: "raciocinio",
  hint: "Olhe o que seu olho encontra primeiro.",
  explanation: "A da direita tem um único ponto de entrada.",
  left:  { label: "Versão A" }, right: { label: "Versão B" },
  better: "right",
  defects: [
    { id: "d1", text: "Tudo com o mesmo peso visual" },
    { id: "d2", text: "Espaçamento inconsistente" },
    { id: "d3", text: "Paleta com cor demais" },
  ],
  correctDefectIds: ["d1", "d2"],
};

it("emptyAnswer de judge começa sem lado e sem defeito", () => {
  expect(emptyAnswer(judge)).toEqual({ kind: "judge", better: null, defectIds: [] });
});

it("judge só está completa com lado escolhido e ao menos um defeito", () => {
  expect(isAnswerComplete(judge, { kind: "judge", better: "right", defectIds: [] })).toBe(false);
  expect(isAnswerComplete(judge, { kind: "judge", better: null, defectIds: ["d1"] })).toBe(false);
  expect(isAnswerComplete(judge, { kind: "judge", better: "right", defectIds: ["d1"] })).toBe(true);
});

it("judge acerta só com lado certo e conjunto exato de defeitos", () => {
  expect(gradeQuestion(judge, { kind: "judge", better: "right", defectIds: ["d2", "d1"] })).toBe(true);
  expect(gradeQuestion(judge, { kind: "judge", better: "left",  defectIds: ["d1", "d2"] })).toBe(false);
  expect(gradeQuestion(judge, { kind: "judge", better: "right", defectIds: ["d1"] })).toBe(false);
  expect(gradeQuestion(judge, { kind: "judge", better: "right", defectIds: ["d1", "d2", "d3"] })).toBe(false);
});

it("judge errada entra em weakConcepts do quiz", () => {
  const out = gradeQuiz([judge], { "q-judge": { kind: "judge", better: "left", defectIds: [] } }, 1);
  expect(out.passed).toBe(false);
  expect(out.weakConcepts).toEqual(["hierarquia visual"]);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/lib/questions.test.ts`
Expected: FAIL — tipo `judge` inexistente.

- [ ] **Step 3: Adicionar `JudgeQuestion` e a variante `judge` de `QuestionAnswer` em `src/content/types.ts`**

Incluir `"judge"` em `QuestionType` e `JudgeQuestion` na union `Question`.

- [ ] **Step 4: Tratar `judge` em `emptyAnswer`, `isAnswerComplete` e `gradeQuestion` em `src/lib/questions.ts`**

O conjunto de defeitos usa o `sameSet` que já existe no arquivo — comparação sem ordem.

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npm run test -- src/lib/questions.test.ts`
Expected: PASS (inclui o Review Focus nº 5, coberto pelo teste de `isAnswerComplete`).

- [ ] **Step 6: Renderizar a questão em `src/components/lesson/QuestionInputs.tsx`**

Dois painéis lado a lado (imagem quando houver `src`, texto quando houver `body`), seleção de um lado, e abaixo a lista de defeitos como múltipla escolha. Seguir os estilos de seleção já usados pelos outros tipos no arquivo.

- [ ] **Step 7: Rodar a suíte inteira**

Run: `npm run test`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/content/types.ts src/lib/questions.ts src/lib/questions.test.ts src/components/lesson/QuestionInputs.tsx
git commit -m "feat(content): questão de julgamento A/B corrigível"
```

---

### Task 4: Persistir o checklist do exercício

Hoje as marcações vivem em `useState` e somem ao recarregar; a spec promove o checklist a instrumento de julgamento e o trabalho real acontece fora do app ao longo de dias (spec §12.6).

**Files:**
- Modify: `src/lib/progress-store.ts` (schema v4, `LessonProgress`, `parseState`, nova mutação)
- Modify: `src/hooks/useProgress.ts`
- Modify: `src/components/lesson/ExercisePanel.tsx:66-72`
- Test: `src/lib/progress-store.test.ts`

**Interfaces:**
- Produces:
  ```ts
  interface LessonProgress {
    steps: Partial<Record<LessonStepId, boolean>>;
    checkpoint: CheckpointRecord | null;
    /** Índices marcados do checklist, por painel. */
    checklists?: Partial<Record<"exercise" | "challenge", number[]>>;
  }
  // ProgressStore
  toggleChecklistItem(lessonId: string, which: "exercise" | "challenge", index: number): void
  ```
  `ProgressState.version` passa a `4`.

- [ ] **Step 1: Escrever os testes que falham (inclui Review Focus nº 1)**

```ts
it("toggleChecklistItem guarda e remove o índice", () => {
  const store = createTestStore();
  store.toggleChecklistItem("l1", "exercise", 2);
  expect(store.getState().lessons.l1.checklists?.exercise).toEqual([2]);
  store.toggleChecklistItem("l1", "exercise", 2);
  expect(store.getState().lessons.l1.checklists?.exercise).toEqual([]);
});

it("blob v3 antigo é lido sem perder XP, conquistas e sequência", () => {
  const v3 = JSON.stringify({
    version: 3, xp: 740,
    lessons: { "fe-html-01-tags": { steps: { learn: true }, checkpoint: null } },
    concepts: {}, streak: { current: 5, longest: 9, lastStudyDate: "2026-10-20" },
    achievements: ["primeira-aula"], missionsClaimed: [],
    profile: { name: "Paloma", goal: "frontend", experience: "projetos", onboardedAt: 1 },
  });
  const state = parseState(v3);
  expect(state.version).toBe(4);
  expect(state.xp).toBe(740);
  expect(state.achievements).toEqual(["primeira-aula"]);
  expect(state.streak.longest).toBe(9);
  expect(state.lessons["fe-html-01-tags"].checklists).toBeUndefined();
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/lib/progress-store.test.ts`
Expected: FAIL — `toggleChecklistItem` não existe.

- [ ] **Step 3: Implementar `checklists` em `LessonProgress`, `coerceLessonProgress`, `version: 4` e `toggleChecklistItem` em `src/lib/progress-store.ts`**

Migração aditiva, no mesmo padrão já usado de v2→v3: campo ausente cai no default, sem tocar em `migrateLegacyIfNeeded`.

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npm run test -- src/lib/progress-store.test.ts`
Expected: PASS

- [ ] **Step 5: Expor a mutação em `src/hooks/useProgress.ts` e consumir em `ExercisePanel.tsx`**

Trocar o `useState<boolean[]>` por leitura do progresso; manter o disparo de `onComplete` quando todos os itens estiverem marcados, e manter `firedRef` para não recreditar XP.

- [ ] **Step 6: Rodar a suíte inteira**

Run: `npm run test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/lib/progress-store.ts src/lib/progress-store.test.ts src/hooks/useProgress.ts src/components/lesson/ExercisePanel.tsx
git commit -m "feat(progress): salva o checklist do exercício entre sessões"
```

---

### Task 5: Estrutura da Trilha 1 — "Coloque seu primeiro app no ar"

Seis fases = seis passos do loop; 12 aulas, todas `draft` nesta tarefa (spec §4.1, §8, §9, §12.1).

**Files:**
- Create: `src/content/trails/app-no-ar.ts`
- Modify: `src/content/index.ts:13-20`
- Test: `src/content/curriculum.test.ts`

**Interfaces:**
- Consumes: `TrailId` da Tarefa 1; `draftLesson` de `src/content/draft.ts`.
- Produces: `export const appNoArTrail: Trail`, id `"app-no-ar"`, com fases de id `ar-p1`…`ar-p6`.

As seis fases, na ordem, com a contagem de aulas decidida em §12.1 da spec:

| Fase | Id | Aulas |
|---|---|---|
| Ideia e referência | `ar-p1` | 2 |
| Especificação | `ar-p2` | 2 |
| Geração | `ar-p3` | 1 |
| Julgamento | `ar-p4` | 3 |
| Conserto | `ar-p5` | 1 |
| Publicação | `ar-p6` | 3 |

- [ ] **Step 1: Escrever os testes que falham**

```ts
it("a trilha de entrega principal é a primeira do currículo", () => {
  expect(curriculum[0].id).toBe("app-no-ar");
});

it("as fases da Trilha 1 são os seis passos do loop", () => {
  const trail = getTrail("app-no-ar")!;
  expect(trail.phases.map((p) => p.id)).toEqual(["ar-p1", "ar-p2", "ar-p3", "ar-p4", "ar-p5", "ar-p6"]);
});

it("a Trilha 1 tem 12 aulas", () => {
  expect(getTrailStats("app-no-ar").lessons).toBe(12);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/content/curriculum.test.ts`
Expected: FAIL — `getTrail("app-no-ar")` é `undefined`.

- [ ] **Step 3: Criar `src/content/trails/app-no-ar.ts`**

Seguir a forma de `src/content/trails/frontend.ts`: `title`, `subtitle`, `description`, `glowClass`, `colorClass`, `accentHsl`, `phases`, `projects`. Cada fase tem 1 etapa (`ar-s1`…`ar-s6`), com as aulas da tabela acima criadas por `draftLesson` e `evolutionMoment` na fase de Julgamento e na de Publicação. `projects: []` nesta tarefa.

- [ ] **Step 4: Colocar `appNoArTrail` como primeira entrada de `curriculum` em `src/content/index.ts`**

Nesta tarefa as trilhas de código continuam no array, depois dela — a remoção é a Tarefa 6.

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npm run test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/content/trails/app-no-ar.ts src/content/index.ts src/content/curriculum.test.ts
git commit -m "feat(content): estrutura da trilha 'Coloque seu primeiro app no ar'"
```

---

### Task 6: Arquivar as trilhas de código, redirecionar rotas e refazer o onboarding

Arquivar, não apagar (spec §12.3); progresso migrado, não descartado (§12.7).

**Files:**
- Move: `src/content/trails/{frontend,backend,fullstack}.ts` → `src/content/archive/`
- Move: `src/content/lessons/fe-*.ts` → `src/content/archive/lessons/`
- Modify: `src/content/index.ts` (currículo só com a trilha nova)
- Modify: `src/App.tsx:24-27` (redirects)
- Modify: `src/lib/onboarding.ts:10-76`
- Modify: `src/pages/Index.tsx:11-13` (mapa de ícones)
- Modify: `src/lib/progress-selectors.ts` (limpeza de órfãos)
- Test: `src/lib/onboarding.test.ts`, `src/content/curriculum.test.ts`, `src/pages/pages.smoke.test.tsx`

**Interfaces:**
- Produces: `curriculum` com uma única trilha, `"app-no-ar"`. `LEGACY_TRAIL_IDS = ["frontend", "backend", "fullstack"] as const` exportado de `src/content/index.ts` para os redirects.

- [ ] **Step 1: Escrever os testes que falham**

```ts
// curriculum.test.ts
it("as trilhas de código saíram do currículo", () => {
  expect(curriculum.map((t) => t.id)).toEqual(["app-no-ar"]);
  expect(getTrail("frontend")).toBeUndefined();
});

// onboarding.test.ts — os objetivos agora são de entrega
it("todo objetivo do onboarding recomenda uma trilha existente", () => {
  for (const goal of GOAL_OPTIONS) {
    expect(getTrail(recommendTrail(goal.id, null).trailId)).toBeDefined();
  }
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test`
Expected: FAIL — currículo ainda tem quatro trilhas; objetivos apontam para `"frontend"`.

- [ ] **Step 3: Escrever o teste do Review Focus nº 3 e implementar os redirects**

```tsx
// pages.smoke.test.tsx
it("rota antiga /roadmap/frontend redireciona para a trilha nova", () => {
  renderAt("/roadmap/frontend");
  expect(screen.queryByText(/não encontrada/i)).not.toBeInTheDocument();
});
```

Em `src/App.tsx`, rotas `/roadmap/:id` para os ids legados devolvem `<Navigate to="/roadmap/app-no-ar" replace />`. Fazer o mesmo para `/roadmap/:trailId/aula/:lessonId` com trilha legada.

- [ ] **Step 4: Mover os arquivos para `src/content/archive/` e enxugar `src/content/index.ts`**

```bash
git mv src/content/trails/frontend.ts src/content/trails/backend.ts src/content/trails/fullstack.ts src/content/archive/
mkdir -p src/content/archive/lessons && git mv src/content/lessons/fe-*.ts src/content/archive/lessons/
```

Corrigir os imports relativos dentro dos arquivos movidos. `curriculum` passa a `[appNoArTrail]`; exportar `LEGACY_TRAIL_IDS`. Os arquivos arquivados continuam compilando (`tsc` cobre `src/`), o que garante que não apodreçam em silêncio.

- [ ] **Step 5: Reescrever os objetivos do onboarding em `src/lib/onboarding.ts`**

Objetivos de entrega, não de cargo: "Colocar um app meu no ar", "Fazer um site com a minha cara", "Automatizar uma tarefa chata", "Ainda não sei". Todos recomendam `"app-no-ar"` nesta versão; `recommendTrail` mantém a assinatura atual e a frase de motivo. Atualizar o mapa de ícones em `src/pages/Index.tsx` para a chave `"app-no-ar"`.

- [ ] **Step 6: Escrever o teste do Review Focus nº 2 e limpar os órfãos**

```ts
it("entradas de aulas que não existem mais não contam como concluídas", () => {
  const state = parseState(JSON.stringify({
    version: 4, xp: 500,
    lessons: { "fe-html-01-tags": { steps: { learn: true, quiz: true }, checkpoint: { attempts: 1, bestScore: 4, bestTotal: 4, passed: true } } },
    concepts: {}, streak: { current: 0, longest: 0, lastStudyDate: null },
    achievements: [], missionsClaimed: [], profile: {},
  }));
  expect(completedLessonCount(state)).toBe(0);
  expect(hasAnyProgress(state)).toBe(true);
});
```

`completedLessonCount` já percorre o currículo, então o órfão não é contado — o teste pina esse comportamento contra regressão. `hasAnyProgress` continua `true`, que é o que preserva a sensação de não ter perdido nada.

- [ ] **Step 7: Rodar a suíte inteira e o typecheck**

Run: `npm run test && npx tsc --noEmit`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add -A src/content src/App.tsx src/lib/onboarding.ts src/lib/onboarding.test.ts src/pages
git commit -m "feat: arquiva as trilhas de código e aponta o app para a trilha de entrega"
```

---

### Task 7: Registro da prova publicada

O link é a prova (spec §4.3, §7.3). Decisão de quem constrói, por a autora ter delegado a pergunta §13.3: o link **rende XP e conquista, mas não trava a conclusão da trilha** — é autodeclarado e inverificável sem backend, e travar puniria quem publicou fora do fluxo.

**Files:**
- Modify: `src/lib/progress-store.ts` (`proofs`, `setProof`)
- Create: `src/components/trail/ProofCard.tsx`
- Modify: `src/pages/RoadmapViewer.tsx`
- Modify: `src/lib/gamification.ts` (conquista)
- Test: `src/lib/progress-store.test.ts`, `src/lib/gamification.test.ts`

**Interfaces:**
- Consumes: schema v4 da Tarefa 4; `appNoArTrail` da Tarefa 5.
- Produces:
  ```ts
  interface ProofRecord { url: string; savedAt: number }
  // ProgressState
  proofs: Record<string, ProofRecord>   // chave = TrailId
  // ProgressStore
  setProof(trailId: string, url: string): boolean  // false se a url for inválida
  ```
  Conquista `"primeiro-link-no-ar"`, 100 XP, concedida na primeira prova salva.

- [ ] **Step 1: Escrever os testes que falham (inclui Review Focus nº 5 da lista, variante de URL)**

```ts
it("setProof guarda uma url http(s) e devolve true", () => {
  const store = createTestStore();
  expect(store.setProof("app-no-ar", "https://meu-app.vercel.app")).toBe(true);
  expect(store.getState().proofs["app-no-ar"].url).toBe("https://meu-app.vercel.app");
});

it("setProof recusa o que não é url e não altera o estado", () => {
  const store = createTestStore();
  expect(store.setProof("app-no-ar", "meu app ta pronto")).toBe(false);
  expect(store.getState().proofs["app-no-ar"]).toBeUndefined();
});

it("a primeira prova salva desbloqueia a conquista", () => {
  const store = createTestStore();
  store.setProof("app-no-ar", "https://meu-app.vercel.app");
  expect(pendingAchievements(store.getState()).map((a) => a.id)).toContain("primeiro-link-no-ar");
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/lib/progress-store.test.ts`
Expected: FAIL — `setProof` não existe.

- [ ] **Step 3: Implementar `proofs`, `coerce` no `parseState` e `setProof` em `src/lib/progress-store.ts`**

Validação: `new URL(value)` dentro de try/catch, aceitando só protocolo `http:` ou `https:`.

- [ ] **Step 4: Adicionar a conquista `primeiro-link-no-ar` ao array `ACHIEVEMENTS` em `src/lib/gamification.ts`**

Seguir a forma dos `AchievementDef` já existentes no arquivo; a condição lê `Object.keys(state.proofs).length > 0`.

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npm run test -- src/lib/progress-store.test.ts src/lib/gamification.test.ts`
Expected: PASS

- [ ] **Step 6: Criar `ProofCard.tsx` e montar em `RoadmapViewer.tsx`**

Campo de link, botão de salvar, mensagem de erro quando `setProof` devolve `false`, e, quando já salvo, o link clicável com a data. Texto do card na voz da spec: a prova é o que a pessoa mostra, não o que ela diz ter feito.

- [ ] **Step 7: Rodar a suíte inteira**

Run: `npm run test && npx tsc --noEmit`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/lib/progress-store.ts src/lib/progress-store.test.ts src/lib/gamification.ts src/lib/gamification.test.ts src/components/trail src/pages/RoadmapViewer.tsx
git commit -m "feat(trilha): registro do link publicado como prova"
```

---

### Task 8: Uma aula escrita de ponta a ponta — "O que faz um resultado parecer genérico"

Primeira aula da fase de Julgamento, escolhida porque é a que usa os dois primitivos novos e carrega a tese. Prova que o modelo aguenta o conteúdo real e vira o molde das outras onze.

**Files:**
- Create: `src/content/lessons/ar-julgamento-01-generico.ts`
- Create: `public/content/app-no-ar/` (imagens da comparação)
- Modify: `src/content/trails/app-no-ar.ts` (troca o `draftLesson` pela aula real)
- Test: `src/content/curriculum.test.ts`

**Interfaces:**
- Consumes: blocos `compare` (Tarefa 2), questão `judge` (Tarefa 3), estrutura da trilha (Tarefa 5).
- Produces: `export const oQueFazParecerGenerico: Lesson`, id `ar-jul-01-generico`, `status: "available"`.

- [ ] **Step 1: Escrever o teste que falha**

```ts
it("a aula de julgamento está completa e usa os primitivos novos", () => {
  const lesson = getLessonLocation("app-no-ar", "ar-jul-01-generico")!.lesson;
  expect(lesson.status).toBe("available");
  expect(lesson.content.some((b) => b.type === "compare")).toBe(true);
  expect([...lesson.questions, ...lesson.checkpoint.questions].some((q) => q.type === "judge")).toBe(true);
});
```

As regras gerais de aula `available` (conteúdo, objetivos, ≥1 recurso, ≥3 perguntas, exercício, ≥3 perguntas de checkpoint, vídeo com id de YouTube válido) já são cobertas pelos testes existentes de `curriculum.test.ts` e passam a valer para esta aula automaticamente.

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npm run test -- src/content/curriculum.test.ts`
Expected: FAIL — a aula não existe.

- [ ] **Step 3: Produzir o par de imagens da comparação**

Duas versões da mesma tela, uma pedida de forma preguiçosa e outra com referência e especificação, salvas em `public/content/app-no-ar/`. **Nenhuma captura de site de terceiro.** Se não houver como gerar as duas versões honestamente nesta tarefa, usar um bloco `compare` com `body` em texto (markup e resultado descritos) em vez de imagem, e deixar a lacuna registrada em `docs/superpowers/plans/` — é melhor uma comparação textual verdadeira do que uma imagem fabricada.

- [ ] **Step 4: Escrever a aula em `src/content/lessons/ar-julgamento-01-generico.ts`**

Conteúdo na tese da spec §4.2: a aula não diz "use referências", ela mostra os dois resultados e deixa a pessoa ver. Pelo menos um bloco `compare` e uma questão `judge`. O exercício é "faça a versão feia de propósito, depois conserte", com `selfCheck` servindo de checklist de julgamento. Cada `freeResource` e o `video` precisam de URL verificada por acesso real antes de entrar — restrição global deste plano.

- [ ] **Step 5: Encaixar a aula na fase `ar-p4` de `src/content/trails/app-no-ar.ts`**

Substituir o `draftLesson` correspondente; a contagem de 12 aulas não muda.

- [ ] **Step 6: Rodar a suíte inteira e o typecheck**

Run: `npm run test && npx tsc --noEmit`
Expected: PASS

- [ ] **Step 7: Rodar o app e abrir a aula**

Run: `npm run dev`
Confirmar na tela: a comparação aparece lado a lado, a questão `judge` deixa escolher lado e defeitos, e o checklist do exercício sobrevive a um recarregamento.

- [ ] **Step 8: Commit**

```bash
git add src/content/lessons/ar-julgamento-01-generico.ts src/content/trails/app-no-ar.ts src/content/curriculum.test.ts public/content
git commit -m "feat(content): aula 'O que faz um resultado parecer genérico'"
```

---

## Fora deste plano

- **As outras 11 aulas da Trilha 1.** Volume de autoria, não de engenharia: entra em plano próprio depois que a Tarefa 8 provar o molde. É o gargalo real da spec (§10).
- **Trilhas 2, 3 e 4.** Existem como ideia na spec §8; estrutura `draft` só depois que a Trilha 1 estiver escrita.
- **README.** Descreve o projeto antigo; reescrever quando a Trilha 1 estiver publicada, não antes.
