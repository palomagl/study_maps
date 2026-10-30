# Aulas no formato dor → solução

**Data:** 2026-10-30
**Autora:** Paloma Lorenzon
**Status:** aprovado — molde, as 12 dores do §5 como estão, e o tratamento "tu" (§12)
**Maquetes aprovadas:** [`mockups/aula-dor-solucao.html`](mockups/aula-dor-solucao.html) (o molde da aula) e [`mockups/telas-agentes.html`](mockups/telas-agentes.html) (início, mapa e aula no visual dos agentes) — abrir no navegador.
**Continua:** [`2026-10-28-studymaps-ia-design.md`](2026-10-28-studymaps-ia-design.md)

---

## 1. Intenção

Toda aula do StudyMaps começa pela **dor** de quem está começando, dita do jeito
que a pessoa sente — e só depois resolve. A pessoa entra numa aula porque se
reconheceu numa frase, não porque o assunto parece importante.

O porquê vem do público: gente de 16 a 25 anos, a maioria homens, que quer tirar
uma ideia do papel com IA. Essa pessoa não procura "aprender hierarquia visual".
Ela procura parar de sentir "pedi pra IA e ficou meio feio, mas não sei o quê".

## 2. O molde

Toda aula `available` segue esta sequência. Ela foi aprovada como maquete, na
aula "O que faz um resultado parecer genérico".

1. **A dor** — uma frase em primeira pessoa, entre aspas, no tom de quem fala.
   Embaixo: "Se isso já aconteceu contigo, essa aula é tua."
2. **O que resolve** — o agente da fase promete a saída numa frase curta, mais
   uma linha que mostra o ganho concreto.
3. **A prova** — mostra antes de explicar (comparação, exemplo, antes/depois).
4. **A ferramenta** — o nome, o critério, o teste, o passo a passo.
5. **A prática** — exercício com checklist e checkpoint, como hoje.
6. **Dor resolvida** — fecha lado a lado: *antes* (a frase da dor) e *agora*
   (a mesma pessoa falando depois da aula, com a ferramenta na boca).

No mapa da trilha, cada aula mostra a dor que resolve embaixo do título:
"resolve: 'Toda vez eu aceito o primeiro que vem'". É o que faz clicar.

## 3. Objetivos, não-objetivos, anti-objetivos

**Objetivos**
- As 12 aulas da Trilha 1 escritas de ponta a ponta nesse molde.
- A aula 4.1, que já existe, convertida para o molde.
- A dor aparecendo no mapa e na lista da trilha.
- O formato garantido por teste: aula `available` sem dor não passa.

**Não-objetivos**
- O redesenho visual completo (agentes, tipografia, as telas novas). É o
  próximo projeto, logo depois deste — a autora escolheu começar pelas aulas.
  Os componentes novos desta etapa (cartão da dor, "o que resolve", "dor
  resolvida") já nascem na paleta nova, para não serem refeitos.
- Trilhas 2, 3 e 4.

**Anti-objetivos**
- Dor genérica ou de livro ("Muitas pessoas têm dificuldade com…"). A dor é uma
  frase que alguém falaria em voz alta para um amigo.
- Dor que a aula não resolve de verdade. O *agora* tem que ser consequência
  direta do que a aula ensina.
- Tom infantil. O público achou a primeira versão visual infantil; o texto não
  pode cair no mesmo erro.
- Qualquer recurso, vídeo ou curso sem URL verificada por acesso real (regra
  que vem da spec original e continua valendo).

## 4. Restrições

- Todas as regras de conteúdo da spec original continuam: nada inventado, plano
  grátis como requisito para chegar ao link, aula de ferramenta ensina conceito
  e manda para a documentação oficial no passo a passo.
- Cada aula `available` precisa passar nos testes que já existem: conteúdo,
  objetivos, ≥1 recurso grátis, ≥3 perguntas, exercício, ≥3 perguntas de
  checkpoint, vídeo só com id de YouTube válido.
- Tom: segunda pessoa, direto, "tu/você" como fala gente de 20 anos no Brasil.
  Sem gíria forçada.

## 5. As 12 dores

Esta tabela é a decisão que mais pesa no trabalho todo. As frases são rascunho
de quem constrói; a autora pode trocar qualquer uma por uma dor que já ouviu de
gente real — essas valem mais.

| Aula | A dor (antes) | O que resolve | Agora |
|---|---|---|---|
| **1.1** Recorte a ideia até ela caber | "Tenho uma ideia gigante e não sei nem por onde começar." | Achar a menor versão que já serve pra alguém. | "Sei qual é a primeira versão — e ela cabe num fim de semana." |
| **1.2** Junte cinco referências | "Peço pra IA e sempre sai a mesma cara de site." | Juntar referência antes de abrir a IA. | "Tenho cinco referências e sei o que eu quero de cada uma." |
| **2.1** Escreva o briefing antes do prompt | "A IA não faz o que eu tô pedindo." | Dizer pra quem é, o que a pessoa faz na tela e o que não entra — antes do prompt. | "Meu pedido cabe numa página e não deixa a IA adivinhar." |
| **2.2** Use a IA pra melhorar teu pedido | "Só descubro o que faltava no pedido depois que vem errado." | Pedir as perguntas antes de pedir o resultado. | "A IA me pergunta o que faltava antes de gerar qualquer coisa." |
| **3.1** A ferramenta certa pra cada pedaço | "Uso o ChatGPT pra tudo e fico travado." | Saber qual ferramenta faz melhor cada pedaço do projeto. | "Lovable pra tela, Claude ou ChatGPT pra pensar e escrever — cada um no seu lugar." |
| **4.1** O que faz um resultado parecer genérico *(existe; converte)* | "Pedi um site pra IA e veio um site. Achei meio feio, mas não sei dizer o quê — então deixei assim." | Dar nome ao defeito. Quem nomeia, conserta. | "Tudo com o mesmo peso, três botões brigando e um texto que serve pra qualquer um." |
| **4.2** Teu checklist de julgamento | "Toda vez eu aceito o primeiro resultado que vem." | Seis perguntas que tu faz a qualquer tela antes de aceitar. | "Passo qualquer resultado no checklist antes de dizer 'tá bom'." |
| **4.3** Faz a versão feia de propósito | "Só percebo que tá ruim quando alguém me fala." | Gerar o ruim de propósito pra treinar o olho. | "Eu vejo o defeito antes de alguém apontar." |
| **5.1** Peça a correção, não outra tentativa | "Pedi pra arrumar uma coisa e a IA estragou o que tava bom." | Um ajuste por vez: o defeito com nome, e o que não pode mexer. | "Peço o conserto e o resto fica no lugar." |
| **6.1** GitHub: onde teu projeto passa a existir | "Meu projeto só existe no meu computador — ou no preview do Lovable." | Um repositório: o lugar de onde o deploy puxa o código. | "Meu código tá no GitHub, com histórico de tudo que mudou." |
| **6.2** Vercel ou Render: a decisão | "Não sei onde colocar meu app no ar e tenho medo de virar conta pra pagar." | Só front: Vercel. Tem backend e banco: Render. Nos dois, plano grátis. | "Sei onde meu tipo de app vai morar — e de graça." |
| **6.3** No ar, com link pra mandar | "Tá pronto, mas ninguém consegue ver." | Publicar, guardar o que não pode vazar e registrar o link. | "Mandei o link pra alguém e abriu." |

## 6. Abordagens

### 6.1 Onde a dor mora no modelo — **uma forma sensata**

| Opção | Troca |
|---|---|
| **Campo próprio na aula** ✅ | `Lesson.pain` com a dor, o que resolve e o *agora*. O teste exige o campo em toda aula `available`; o mapa lê a dor sem abrir a aula; o "dor resolvida" do fim da aula reaproveita a mesma frase do começo. |
| Reaproveitar blocos de conteúdo (`callout`) | Não dá para garantir por teste que toda aula abre pela dor, o mapa teria que procurar a dor dentro do conteúdo, e o *antes* do fim teria que repetir o texto do começo à mão. |

A segunda trabalha contra o motivo do formato existir — ele só funciona se for
**garantido em toda aula** —, então há uma forma sensata só.

### 6.2 Como escrever as 11 aulas novas — **decidir no plano**

| Opção | Troca |
|---|---|
| Uma por vez, em sequência | Voz mais uniforme entre as aulas; mais lento. |
| Em paralelo, uma aula por agente, com revisão de cada uma | Mais rápido; o risco é a voz variar entre aulas, mitigado pelo molde (a 4.1 convertida), pela tabela de dores acima e pelos testes. |

## 7. O modelo

```ts
interface LessonPain {
  /** A dor, em primeira pessoa, sem aspas no texto. É também o "antes" do fim. */
  quote: string;
  /** O que resolve, numa frase. */
  resolve: string;
  /** Uma linha com o ganho concreto. Opcional. */
  resolveDetail?: string;
  /** A mesma pessoa depois da aula, em primeira pessoa. */
  after: string;
}

interface Lesson {
  // …campos de hoje…
  /** Obrigatório em aula `available`; `draft` pode ter só `quote` para o mapa. */
  pain?: LessonPain;
}
```

As aulas em rascunho já ganham a `quote` agora, para o mapa mostrar a dor de
toda aula desde já — mesmo as que ainda não abriram.

## 8. O que muda na interface

- **Aula:** cartão da dor no topo, cartão "o que resolve" com o agente da fase,
  e "dor resolvida" (antes/agora) depois do checkpoint.
- **Mapa e lista da trilha:** a dor embaixo do título de cada aula.
- Os três componentes nascem com a paleta nova (fundo roxo-escuro, dor em
  coral, solução em menta, rótulos em fonte mono). O resto da interface muda no
  projeto seguinte.

## 9. Os agentes e a paleta (decidido nas maquetes)

**Agentes.** Um por fase, chamado pelo nome da fase — Ideia, Pedido, Geração,
Julgamento, Conserto, No ar —, sem nome próprio. Corpo de cápsula, visor escuro
com olhar firme, distintivo da função no peito: lâmpada, caneta, faísca, lupa,
chave, foguete. Sem bochecha, sem sorriso: a primeira versão, com bichinhos
redondos e fofos, foi recusada por parecer infantil. Na aula, o agente fala em
primeira pessoa no quadro de guia ("Antes de eu explicar: olha os dois"); o
texto de "o que resolve" é impessoal, como na tabela do §5. O desenho exato está
em `mockups/telas-agentes.html`.

**Paleta.**

| Uso | Cor |
|---|---|
| Fundo | `#0B0717` |
| Superfície (cartões) | `#120C26` |
| Borda | `#2E2357` |
| Texto | `#F2EEFF` |
| Texto secundário | `#A99CD6` |
| Destaque / roxo | `#7C5CFF` |
| Solução / ação | `#3DF5B0` (menta) |
| Dor | `#FF6B8A` (coral) |
| Agentes | Ideia `#FFB020` · Pedido `#3DF5B0` · Geração `#FF3D9A` · Julgamento `#7C5CFF` · Conserto `#FF6B2C` · No ar `#2EC5FF` |

**Tipografia.** Archivo largo e pesado (largura 125%, peso 900, caixa alta) nos
títulos; Inter no corpo; JetBrains Mono nos rótulos pequenos ("04 · JULGAMENTO").

## 10. Decisões de quem constrói

Pontos que o revisor levantou e que não precisavam voltar para a autora.

**10.1 Revisão de cada aula.** Cada aula passa por uma revisão automática antes
de entrar, com checklist fixo: a dor soa como fala de gente de verdade; o
*agora* é consequência direta do que a aula ensina; toda URL foi aberta e
confere; tom igual ao da 4.1 convertida; testes verdes. A autora revisa o
conjunto no fim, no app — aprovar aula por aula, onze vezes, travaria o
trabalho sem ganho proporcional, já que o molde e as dores ela aprova antes.

**10.2 O teste de imagens deixa de exigir imagem em toda aula.** Hoje ele falha
qualquer aula `available` sem imagem, o que obrigaria ilustração em aulas como
GitHub e Vercel, onde a prova pode ser texto (exemplo, antes/depois). Passa a
exigir que **toda imagem referenciada exista** e que pelo menos uma aula da
trilha tenha imagem (para o teste não passar vazio). Era um defeito do teste,
não uma regra de conteúdo.

**10.3 A 4.1 troca de exercício.** O exercício atual dela ("faça a versão feia
de propósito") é o assunto inteiro da 4.3. Na conversão, a 4.1 fica com
"nomeia os defeitos de um resultado teu que tu já tinha aceitado" (hoje é o
desafio dela), e a versão feia vai inteira para a 4.3.

**10.4 Ids e slugs ficam.** As rotas usam o id da aula, então renomear título
não quebra link. Os títulos seguem o tratamento escolhido no §12.

**10.5 O agente nos cartões vem da fase.** Um mapa fase → agente resolve o
cartão "o que resolve" nesta etapa; o campo `agent` na `Phase` entra no projeto
visual, junto com o desenho definitivo.

## 11. Em aberto para quem constrói

- Ordem de escrita das aulas.
- Quais aulas ganham questão de julgamento (A/B) — pelo menos as da fase 4.
- Paralelo ou sequência na escrita (§6.2), decidido no plano.

## 12. Respondido pela autora

1. **As 12 dores do §5 ficam como estão.**
2. **O tratamento é "tu"**, do jeito que se fala, não como na gramática:
   - verbo na terceira pessoa: "tu faz", "tu pede", "tu já aceitou" — nunca
     "tu fazes";
   - possessivos e pronomes: teu, tua, contigo ("essa aula é tua");
   - imperativo do jeito falado: "olha", "faz", "pede", "repara";
   - vale para todo texto das aulas, títulos incluídos ("Teu checklist de
     julgamento"). A aula 4.1, hoje em "você", é reescrita nesse tom na
     conversão.
