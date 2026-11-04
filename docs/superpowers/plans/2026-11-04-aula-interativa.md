# Aula interativa (entrega 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aula em telas de celular conduzida pelo robô da fase — motor + aulas 1.1 e 1.2 + entrada direta.

**Architecture:** Uma aula ganha um roteiro opcional `play` (pedaços → telas). Quando existe, a rota da aula abre o `LessonPlayer` em tela cheia no lugar da `LessonView`. A lógica (conferir resposta, trocar `{ideia}`, sílabas dos bipes) é pura e testada; som, bipes e vibração vivem em `src/lib/sound.ts` e não fazem nada onde o navegador não tem áudio (testes). O progresso de pedaços entra no `ProgressState` sem quebrar quem já concluiu aula no formato antigo.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind, framer-motion, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-04-aula-interativa-design.md`

## Global Constraints

- Celular primeiro: nada estoura 375px de largura; botões grandes, embaixo, ao alcance do dedão.
- Tratamento em "tu"; nenhuma tela com mais de ~3 linhas de leitura sem um toque.
- Sem serviço pago; som gerado no navegador (Web Audio); vibração via `navigator.vibrate` quando existir.
- Errar nunca trava: explica e segue. Sem vidas/corações.
- Quem já concluiu uma aula no formato antigo continua com ela concluída (agentes e certificado intactos).
- Typecheck: `npx tsc -p tsconfig.app.json --noEmit`. Testes: `npx vitest run`.

## Review Focus

1. Pessoa que já tinha concluído a 1.1 no formato antigo abre a aula → continua concluída; o player começa do primeiro pedaço não feito, sem apagar nada.
2. `{ideia}` numa fala quando a pessoa ainda não escreveu a ideia (ex.: abriu a 1.2 direto) → texto alternativo, nunca "{ideia}" na tela.
3. Navegador sem áudio / som desligado / iPhone sem vibração → tudo funciona em silêncio, sem erro.
4. Recarregar a página no meio de um pedaço → volta pro começo daquele pedaço (pedaço só conta inteiro), sem duplicar XP.
5. Texto escrito pela pessoa com `<`, aspas ou muito longo → aparece como texto, cortado em 140 caracteres.

---

### Task 1: Tipos do roteiro e a lógica pura

**Files:**
- Modify: `src/content/types.ts` — `Lesson.play?: LessonPlay`
- Create: `src/lib/play.ts`
- Test: `src/lib/play.test.ts`

**Interfaces:**
- Produces:
  - `type PlayCard = { kind: "fala"; text: string } | { kind: "dor" } | { kind: "escolha"; prompt: string; options: { id: string; text: string }[]; correctId: string; beliefId?: string; right: string; wrong: string } | { kind: "cortar"; prompt: string; chips: { text: string; keep: boolean }[]; right: string; wrong: string } | { kind: "montar"; prompt: string; answer: string[]; distractors: string[]; right: string; wrong: string } | { kind: "escrever"; prompt: string; placeholder: string; saveAs: string }`
  - `interface PlayPiece { id: string; title: string; cards: PlayCard[]; mission: string }`, `interface LessonPlay { pieces: PlayPiece[] }`
  - `checkAnswer(card, answer): boolean` — answer: `string` (escolha: id), `string[]` (cortar: textos mantidos; montar: blocos em ordem)
  - `fillNotes(text: string, notes: Record<string, string>, fallback: Record<string, string>): string` — troca `{chave}`
  - `syllables(text: string): string[]` — pedaços pra bipe
  - `PIECE_XP = 40`, `NOTE_MAX = 140`

- [ ] Teste: `checkAnswer` — escolha certa/errada; cortar exige exatamente os `keep` (ordem não importa); montar exige a ordem de `answer`.
- [ ] Teste: `fillNotes("Tua ideia: {ideia}", {}, { ideia: "a tua ideia" })` → `"Tua ideia: a tua ideia"`; com nota usa a nota; chave sem nota nem fallback → string vazia, nunca `{ideia}`.
- [ ] Teste: `syllables("E se a gente?")` junta de volta no texto original (`join("")` sem espaços perdidos é responsabilidade do player; aqui: todo pedaço não vazio, nenhum caractere perdido além de espaços).
- [ ] Rodar → falha; implementar; rodar → passa; commit `feat(aula): roteiro de telas e a lógica de conferir`.

### Task 2: Progresso de pedaços e notas

**Files:**
- Modify: `src/lib/progress-store.ts` — `LessonProgress.pieces?: string[]`; `ProgressState.notes: Record<string, string>`; `completePiece(lessonId, pieceId, xp)`, `saveNote(key, text)`; `parseState` lê os dois.
- Modify: `src/lib/progress-selectors.ts` — `lessonCompletion` com `play`: `complete` = todos os pedaços feitos **ou** passos antigos completos; `doneSteps/totalSteps` contam pedaços.
- Modify: `src/hooks/useProgress.ts` — expõe `completePiece`, `saveNote`, `notes`.
- Test: `src/lib/play-progress.test.ts`

**Interfaces:**
- Consumes: `LessonPlay` (Task 1).
- Produces: `progressStore.completePiece(lessonId: string, pieceId: string, xp: number): void` (idempotente: o segundo não dá XP), `progressStore.saveNote(key: string, text: string): void` (corta em `NOTE_MAX`, ignora vazio), `nextPieceIndex(state, lesson): number` em `progress-selectors.ts` (primeiro pedaço não feito; `pieces.length` se todos).

- [ ] Testes: completar pedaço dá XP uma vez; aula com `play` conclui só com todos os pedaços; **aula concluída no formato antigo continua concluída** (Review 1); `saveNote` corta em 140 e guarda o texto cru (Review 5); `parseState` aceita blob sem `notes`/`pieces` e descarta lixo.
- [ ] Falha → implementa → passa → commit `feat(aula): progresso por pedaço e a ideia guardada`.

### Task 3: Som, bipes e vibração

**Files:**
- Create: `src/lib/sound.ts`
- Modify: `src/lib/agents.ts` — `AGENTS[k].voice: { base: number; spread: number; wave: OscillatorType; ms: number; vol: number }` e `catchphrase: string`, valores do protótipo `time-de-robos.html` (Ideia 620/260/square/55; Pedido 480/90/sine/75; Geração 760/340/triangle/38; Julgamento 300/60/sine/110; Conserto 260/40/triangle/120; No ar 540/420/square/48).
- Test: `src/lib/sound.test.ts`

**Interfaces:**
- Produces: `sfx.tap()`, `sfx.right()`, `sfx.wrong()`, `sfx.finish()`, `babble(agent: AgentKind, syllable: string)`, `vibrate(pattern: number | number[])`, `isMuted(): boolean`, `setMuted(v: boolean)` (salvo em `localStorage["studymaps:som"]`, com try/catch).
- [ ] Teste: sem `AudioContext` e sem `navigator.vibrate` (jsdom), todas as funções rodam sem lançar (Review 3); `setMuted(true)` persiste e `isMuted()` lê.
- [ ] Falha → implementa → passa → commit `feat(aula): som, bipes por robô e vibração`.

### Task 4: O player

**Files:**
- Create: `src/components/play/LessonPlayer.tsx` (topo com ✕, barra, combo, mudo; uma tela por vez; "Verificar"; fim do pedaço)
- Create: `src/components/play/RobotLine.tsx` (robô + balão; texto aparece sílaba a sílaba com bipe; robô `fala`/`feliz`/`triste`)
- Create: `src/components/play/cards.tsx` (Fala, Dor, Escolha, Cortar, Montar, Escrever)
- Create: `src/components/play/FeedbackSheet.tsx` (sobe de baixo, verde/vermelha, título + texto + botão)
- Create: `src/components/play/PieceEnd.tsx` (XP, % acertos, tempo, combo máx., missão, quanto falta pro agente, vídeo/recursos como extra, "Próximo pedaço" / "Parar por hoje"; pede o nome se não tiver)
- Modify: `src/pages/LessonView.tsx` — se `lesson.status === "available" && lesson.play`, renderiza `<LessonPlayer>`.
- Test: `src/components/play/player.test.tsx`

**Interfaces:**
- Consumes: Tasks 1–3; `agentForPhase`, `Agent`, `ResourceList`, `VideoCard`, `useProgress`.
- Produces: `<LessonPlayer trail lesson phase />`.
- Regras: o robô que fala é o da fase; escolha com `beliefId` errada → título "Todo mundo faz isso"; combo aparece a partir de 2; recarregar recomeça o pedaço atual (Review 4); texto da pessoa sempre como texto (Review 5); textos passam por `fillNotes` com fallback `{ ideia: "a tua ideia" }` (Review 2).
- [ ] Testes (com um roteiro de teste de 1 pedaço com todos os tipos): percorre as telas; escolha errada mostra a folha vermelha com o texto `wrong`; acerto mostra a verde; no fim aparece "Pedaço feito" e o pedaço fica concluído no store; ✕ volta pra trilha; sem nome, o fim do pedaço pede "Como o time te chama?" e salva.
- [ ] Falha → implementa → passa → typecheck → commit `feat(aula): player de telas conduzido pelo robô`.

### Task 5: Aulas 1.1 e 1.2 no formato novo

**Files:**
- Modify: `src/content/lessons/ar-ideia-01-recortar.ts`, `ar-ideia-02-referencias.ts` — `play` com 2 pedaços cada.
- Test: `src/content/curriculum.test.ts`

- 1.1 pedaço 1 "A ideia do Caio": fala de apresentação do Ideia; dor; escolha "primeiro passo do Caio" (crença = falsa solução da tabela); cortar (fica: mandar o link, ver quem confirmou); montar "Quem marca o rolê / manda o link / e vê quem confirmou"; escrever a tua ideia → `saveAs: "ideia"`. Missão: escrever a lista de tudo que a tua ideia tem. Pedaço 2 "A régua": perguntas do quiz e do checkpoint atuais viradas em escolha/montar (login/pagamento, "e também", régua do fim de semana).
- 1.2 pedaço 1 "A pasta do Caio": abre com o Ideia lembrando `{ideia}`; dor; escolha com a crença "mais adjetivo"; escolha "qual anotação vira pedido" (pasta A × B); montar "o roxo forte / só no botão principal". Pedaço 2 "Tuas cinco": onde procurar (cortar o que não é referência), escrever a anotação de uma referência → `saveAs: "referencia"`. Missão: juntar 5 referências com anotação.
- [ ] Teste: toda aula com `play` tem pedaços com ≥4 telas, termina com missão, e toda `escolha` tem `correctId` entre as opções; nenhuma fala passa de 180 caracteres; 1.1 e 1.2 têm `play`.
- [ ] Falha → escreve → passa → commit `feat(aulas): 1.1 e 1.2 em telas, conduzidas pelo Ideia`.

### Task 6: Entrada direta e no ar

**Files:**
- Modify: `src/pages/Index.tsx` — o botão principal leva direto pra `/roadmap/app-no-ar/aula/ar-ideia-01-recortar`.
- Test: `src/pages/pages.smoke.test.tsx`

- [ ] Teste: na home sem progresso, o botão principal aponta pra aula 1.1; abrir a 1.1 mostra o player (não o formulário).
- [ ] Falha → implementa → passa → suite inteira + typecheck + build → conferir no navegador em 375px → commit, merge no `main`, push.
