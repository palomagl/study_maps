import type { Lesson } from "@/content/types";

/** Front-end · Fase 1 · Etapa "Estrutura com HTML" · aula 2. */
export const htmlFormulariosEAcessibilidade: Lesson = {
  id: "fe-html-02-forms",
  slug: "formularios-e-acessibilidade",
  title: "Formulários e acessibilidade",
  summary:
    "Inputs, labels, tipos e validação nativa — e como escrever HTML que funciona também para quem não usa o mouse ou enxerga a tela.",
  estimatedMinutes: 30,
  status: "available",

  learningObjectives: [
    "Montar um formulário com <form>, <label>, <input>, <select> e <button>",
    "Associar cada label ao seu campo e explicar por que isso importa",
    "Escolher o type de input certo (email, tel, number, password, date…) e o que ele muda",
    "Usar validação nativa (required, min, max, pattern) antes de recorrer a JavaScript",
    "Aplicar o básico de acessibilidade: foco, texto alternativo, contraste e uso de teclado",
  ],

  content: [
    {
      type: "paragraph",
      text: "Formulário é onde o usuário **fala com o sistema**: login, busca, cadastro, checkout. Um formulário bem marcado já vem com validação, teclado adaptado no celular, navegação por Tab e suporte a leitor de tela — tudo **sem uma linha de JavaScript**. Um formulário mal marcado vira uma pilha de bugs e exclui gente do seu produto.",
    },
    {
      type: "callout",
      variant: "analogy",
      title: "Uma analogia",
      text: "Um `<input>` sem `<label>` é como uma gaveta sem etiqueta: você até adivinha o que vai dentro olhando o contexto, mas quem está de olhos fechados (um leitor de tela) não tem como saber.",
    },

    { type: "heading", text: "A estrutura de um formulário" },
    {
      type: "code",
      language: "html",
      code: `<form action="/cadastro" method="post">
  <label for="nome">Nome completo</label>
  <input id="nome" name="nome" type="text" required />

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required />

  <label for="plano">Plano</label>
  <select id="plano" name="plano">
    <option value="free">Gratuito</option>
    <option value="pro">Pro</option>
  </select>

  <button type="submit">Criar conta</button>
</form>`,
    },
    {
      type: "list",
      items: [
        "**`<form>`** agrupa os campos. `action` é para onde os dados vão; `method` é como (`get` coloca na URL, `post` no corpo).",
        "**`name`** é a chave com que cada campo é enviado. Sem `name`, o campo não vai junto.",
        "**`<button type=\"submit\">`** envia o formulário. `type=\"button\"` não envia nada (útil para ações de JS).",
      ],
    },

    { type: "heading", text: "Label: o detalhe que muda tudo" },
    {
      type: "paragraph",
      text: "O `for` do `<label>` precisa bater com o `id` do campo. Com isso: clicar no texto foca o campo (alvo maior no celular), e o leitor de tela anuncia \"Nome completo, campo de edição\" em vez de só \"campo de edição\".",
    },
    {
      type: "example",
      title: "Duas formas válidas de associar",
      text: "Ou você usa `for`/`id`, ou embrulha o campo dentro do label.",
      code: {
        language: "html",
        code: `<!-- explícito -->
<label for="cep">CEP</label>
<input id="cep" name="cep" />

<!-- implícito (embrulhado) -->
<label>
  CEP
  <input name="cep" />
</label>`,
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Não caia nessa",
      text: "Usar `placeholder` no lugar de `<label>`. O placeholder some quando o usuário começa a digitar, tem contraste baixo e nem sempre é lido por tecnologias assistivas. Ele é uma **dica**, não um rótulo.",
    },

    { type: "heading", text: "O type do input importa" },
    {
      type: "paragraph",
      text: "O atributo `type` muda o teclado que aparece no celular, a validação automática e os controles do navegador.",
    },
    {
      type: "list",
      items: [
        "**`email`** — valida o formato e abre teclado com `@`.",
        "**`tel`** — abre o teclado numérico de telefone (não valida formato).",
        "**`number`** — só aceita números; combina com `min`, `max`, `step`.",
        "**`password`** — esconde o texto digitado.",
        "**`date`** / **`time`** — mostram um seletor nativo.",
        "**`search`**, **`url`** — variações com teclado e semântica próprios.",
      ],
    },

    { type: "heading", text: "Validação nativa: comece por aqui" },
    {
      type: "paragraph",
      text: "Antes de escrever JavaScript de validação, veja o que o HTML já entrega. O navegador impede o envio e mostra a mensagem sozinho.",
    },
    {
      type: "code",
      language: "html",
      code: `<input type="email" required />
<input type="text" minlength="3" maxlength="20" required />
<input type="number" min="18" max="120" />
<input type="text" pattern="\\d{5}-\\d{3}" placeholder="00000-000" />`,
    },
    {
      type: "callout",
      variant: "info",
      text: "Validação no navegador é conveniência, não segurança. O servidor **sempre** precisa validar de novo — dá para burlar o HTML com duas linhas no console.",
    },

    { type: "heading", text: "Acessibilidade: o mínimo que não é opcional" },
    {
      type: "list",
      items: [
        "**Teclado** — dá para usar tudo só com Tab, Shift+Tab, Enter e setas? Nunca remova o contorno de foco sem colocar outro no lugar.",
        "**Imagens** — `alt` descritivo quando a imagem informa; `alt=\"\"` quando é puramente decorativa.",
        "**Ordem** — a ordem do HTML é a ordem de leitura e de Tab. Escreva na sequência que faz sentido ouvir.",
        "**Contraste** — texto precisa se destacar do fundo (mínimo 4.5:1 para texto normal).",
        "**Erros** — a mensagem de erro precisa estar ligada ao campo (`aria-describedby`) e não depender só de cor.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Na prática",
      text: "Abra qualquer formulário seu e tente preenchê-lo **sem tocar no mouse**. Depois rode o Lighthouse (aba do DevTools) na categoria Acessibilidade. As duas coisas revelam a maioria dos problemas em minutos.",
    },
  ],

  video: {
    title: "Learn HTML forms in 8 minutes",
    provider: "YouTube",
    channel: "Bro Code",
    url: "https://www.youtube.com/watch?v=2O8pkybH6po",
    description:
      "Tour rápido por inputs, labels, selects, radios e checkboxes. Em inglês.",
    lang: "en",
  },

  freeResources: [
    {
      kind: "docs",
      title: "Meu primeiro formulário HTML",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Learn/Forms/Your_first_form",
      description: "Do zero ao primeiro formulário funcional, explicando cada parte.",
      lang: "pt-BR",
    },
    {
      kind: "docs",
      title: "Validação de formulário no lado do cliente",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Learn/Forms/Form_validation",
      description: "required, pattern, minlength e as pseudo-classes :valid / :invalid.",
      lang: "pt-BR",
    },
    {
      kind: "course",
      title: "Learn Forms",
      provider: "web.dev (Google)",
      url: "https://web.dev/learn/forms",
      description: "Curso escrito focado em formulários acessíveis e bem estruturados.",
      lang: "en",
    },
    {
      kind: "article",
      title: "Fundamentos de acessibilidade web",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Learn/Accessibility/HTML",
      description: "O que o HTML bem escrito já resolve de acessibilidade.",
      lang: "pt-BR",
    },
  ],

  premiumResources: [
    {
      title: "Acessibilidade Web: fundamentos",
      platform: "Alura",
      url: "https://www.alura.com.br/",
      reason:
        "Para ir além do básico (ARIA, testes com leitor de tela, navegação por teclado em componentes complexos), esta trilha aprofunda o tema com prática.",
    },
  ],

  questions: [
    {
      id: "q-forms-label-assoc",
      type: "single",
      skill: "aplicacao",
      concept: "forms-label",
      prompt:
        "Qual das opções associa corretamente o rótulo ao campo, de modo que clicar no texto foque o input?",
      options: [
        {
          id: "a",
          text: "<label for=\"cpf\">CPF</label> … <input id=\"cpf\" name=\"cpf\" />",
        },
        {
          id: "b",
          text: "<label>CPF</label> … <input name=\"cpf\" placeholder=\"CPF\" />",
        },
        {
          id: "c",
          text: "<label id=\"cpf\">CPF</label> … <input for=\"cpf\" name=\"cpf\" />",
        },
        { id: "d", text: "<span class=\"label\">CPF</span> … <input name=\"cpf\" />" },
      ],
      correctOptionIds: ["a"],
      hint: "O `for` do label aponta para o `id` do input — nessa direção.",
      explanation:
        "A associação é `label[for]` → `input[id]` com o mesmo valor. A opção C inverte os atributos; as outras não associam nada.",
    },
    {
      id: "q-forms-input-type",
      type: "single",
      skill: "aplicacao",
      concept: "forms-input-type",
      prompt:
        "Você quer um campo de telefone que, no celular, abra o teclado numérico — mas sem impor um formato fixo. Qual `type`?",
      options: [
        { id: "a", text: "type=\"tel\"" },
        { id: "b", text: "type=\"number\"" },
        { id: "c", text: "type=\"text\"" },
        { id: "d", text: "type=\"phone\"" },
      ],
      correctOptionIds: ["a"],
      hint: "`number` recusaria parênteses e traços; `text` não muda o teclado.",
      explanation:
        "`tel` abre o teclado de telefone e aceita qualquer caractere (bom para `(11) 90000-0000`). `number` bloquearia símbolos; `phone` não existe.",
    },
    {
      id: "q-forms-placeholder-label",
      type: "boolean",
      skill: "compreensao",
      concept: "forms-label",
      prompt:
        "Usar apenas `placeholder`, sem `<label>`, é aceitável desde que o texto do placeholder seja claro.",
      options: [
        { id: "t", text: "Verdadeiro" },
        { id: "f", text: "Falso" },
      ],
      correctOptionIds: ["f"],
      hint: "O que acontece com o placeholder quando o usuário começa a digitar?",
      explanation:
        "Falso. O placeholder some ao digitar, tende a ter contraste baixo e nem sempre é anunciado por leitores de tela. Ele complementa o label — não o substitui.",
    },
    {
      id: "q-forms-validation-order",
      type: "order",
      skill: "raciocinio",
      concept: "forms-validation",
      prompt:
        "Um usuário clica em \"Enviar\" num formulário com `<input type=\"email\" required>` vazio. Ordene o que acontece:",
      items: [
        { id: "click", text: "O usuário aciona o botão de submit" },
        { id: "check", text: "O navegador checa as regras nativas (required, type…)" },
        { id: "block", text: "Encontra o campo inválido e cancela o envio" },
        { id: "focus", text: "Foca o campo e mostra a mensagem de erro nativa" },
        { id: "server", text: "Só depois de tudo válido, os dados vão ao servidor" },
      ],
      correctOrder: ["click", "check", "block", "focus", "server"],
      hint: "A validação nativa roda antes de qualquer coisa sair do navegador.",
      explanation:
        "O submit dispara a checagem nativa; havendo campo inválido, o envio é cancelado, o campo recebe foco e a bolha de erro aparece. O servidor só é chamado quando passa.",
    },
    {
      id: "q-forms-a11y-match",
      type: "match",
      skill: "compreensao",
      concept: "acessibilidade",
      prompt: "Relacione cada prática ao problema que ela evita:",
      left: [
        { id: "alt", text: "alt descritivo nas imagens" },
        { id: "focus", text: "Manter um indicador de foco visível" },
        { id: "order", text: "Escrever o HTML na ordem de leitura" },
        { id: "contrast", text: "Contraste mínimo de 4.5:1 no texto" },
      ],
      right: [
        { id: "r-alt", text: "Quem usa leitor de tela não sabe o que a imagem mostra" },
        { id: "r-focus", text: "Quem navega por teclado se perde na página" },
        { id: "r-order", text: "A ordem do Tab e da leitura fica confusa" },
        { id: "r-contrast", text: "Texto ilegível para baixa visão ou sob sol forte" },
      ],
      correctPairs: [
        { leftId: "alt", rightId: "r-alt" },
        { leftId: "focus", rightId: "r-focus" },
        { leftId: "order", rightId: "r-order" },
        { leftId: "contrast", rightId: "r-contrast" },
      ],
      hint: "Cada prática protege um grupo específico de usuários.",
      explanation:
        "alt → quem não vê a imagem; foco visível → quem usa teclado; ordem do HTML → ordem de Tab/leitura; contraste → baixa visão e telas sob luz.",
    },
  ],

  exercise: {
    id: "ex-forms-cadastro",
    title: "Monte um formulário de cadastro acessível",
    statement:
      "Crie um `<form>` de cadastro com: nome, e-mail, senha (mínimo 8 caracteres), data de nascimento, um `<select>` de país e um checkbox \"Aceito os termos\". Sem CSS e sem JavaScript.",
    steps: [
      "Cada campo tem um `<label>` associado por `for`/`id`.",
      "Use o `type` certo em cada input (email, password, date).",
      "Marque os obrigatórios com `required` e a senha com `minlength=\"8\"`.",
      "O botão é `<button type=\"submit\">`.",
      "Preencha o formulário inteiro usando só o teclado para conferir a ordem de Tab.",
    ],
    hints: [
      "O checkbox também precisa de label associado.",
      "`autocomplete=\"email\"`, `autocomplete=\"new-password\"` etc. ajudam o navegador a preencher — e são acessibilidade.",
    ],
    solution: {
      language: "html",
      code: `<form action="/cadastro" method="post">
  <label for="nome">Nome</label>
  <input id="nome" name="nome" type="text" autocomplete="name" required />

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" autocomplete="email" required />

  <label for="senha">Senha (mín. 8 caracteres)</label>
  <input id="senha" name="senha" type="password" minlength="8"
         autocomplete="new-password" required />

  <label for="nasc">Data de nascimento</label>
  <input id="nasc" name="nascimento" type="date" required />

  <label for="pais">País</label>
  <select id="pais" name="pais">
    <option value="br">Brasil</option>
    <option value="pt">Portugal</option>
  </select>

  <label>
    <input type="checkbox" name="termos" required />
    Aceito os termos de uso
  </label>

  <button type="submit">Cadastrar</button>
</form>`,
    },
    selfCheck: [
      "Todo campo tem um label associado (clicar no texto foca o campo)",
      "Os tipos estão certos: email, password, date",
      "Consigo preencher e enviar usando só o teclado",
      "Tentar enviar vazio mostra as mensagens de erro nativas",
    ],
  },

  challenge: {
    id: "ch-forms-checkout",
    title: "Formulário de checkout em uma coluna",
    statement:
      "Marque o HTML de um checkout: dados de contato, endereço de entrega e forma de pagamento (radios: cartão / Pix / boleto). Agrupe as seções e faça a validação nativa fazer o máximo possível.",
    requirements: [
      "Cada seção usa <fieldset> com <legend>",
      "Os radios de pagamento compartilham o mesmo name e têm labels",
      "CEP usa pattern para o formato 00000-000",
      "Campos essenciais são required; e-mail usa type=\"email\"",
      "A ordem do HTML segue a ordem visual/lógica do preenchimento",
      "Passa no validador do W3C e é 100% navegável por teclado",
    ],
    hints: [
      "`<fieldset>` + `<legend>` dão a leitores de tela o contexto \"Endereço de entrega: campo Rua\".",
      "Radios só funcionam como grupo se todos tiverem o mesmo `name`.",
    ],
  },

  checkpoint: {
    id: "cp-html-forms",
    passThreshold: 4,
    successMessage:
      "🎉 CHECKPOINT CONCLUÍDO — seus formulários já nascem acessíveis e validados.",
    questions: [
      {
        id: "cp-forms-name-attr",
        type: "single",
        skill: "raciocinio",
        concept: "forms-estrutura",
        prompt:
          "Você tem um `<input type=\"text\" id=\"cupom\">` dentro do form, mas o valor dele nunca chega ao servidor no envio. Qual é a causa mais provável?",
        options: [
          { id: "a", text: "Falta o atributo name no input" },
          { id: "b", text: "Falta o atributo id no input" },
          { id: "c", text: "O input precisa estar dentro de um <label>" },
          { id: "d", text: "type=\"text\" não é enviado; só type=\"submit\"" },
        ],
        correctOptionIds: ["a"],
        hint: "Qual atributo vira a *chave* do dado no envio?",
        explanation:
          "Campos sem `name` são ignorados no envio do formulário. O `id` serve para associar label e para CSS/JS, mas não participa do envio.",
      },
      {
        id: "cp-forms-type-email",
        type: "boolean",
        skill: "compreensao",
        concept: "forms-validation",
        prompt:
          "`<input type=\"email\" required>` já impede o envio quando o texto não parece um e-mail, sem precisar de JavaScript.",
        options: [
          { id: "t", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["t"],
        hint: "Essa é a validação nativa do navegador.",
        explanation:
          "Verdadeiro. O navegador checa o formato básico e bloqueia o submit com uma mensagem. Ainda assim, o servidor precisa revalidar.",
      },
      {
        id: "cp-forms-outline",
        type: "single",
        skill: "aplicacao",
        concept: "acessibilidade",
        prompt:
          "No CSS de um projeto você encontra `*:focus { outline: none; }` e nada substituindo. Qual é o impacto?",
        options: [
          {
            id: "a",
            text: "Quem navega por teclado perde a referência de onde está na página",
          },
          { id: "b", text: "Nenhum — outline é apenas estético" },
          { id: "c", text: "Os formulários param de enviar" },
          { id: "d", text: "As imagens perdem o alt" },
        ],
        correctOptionIds: ["a"],
        hint: "O outline de foco é uma pista de navegação, não decoração.",
        explanation:
          "Remover o indicador de foco sem colocar outro deixa usuários de teclado sem saber qual elemento está ativo. Se for redesenhar, use `:focus-visible` com um estilo claro.",
      },
      {
        id: "cp-forms-button-type",
        type: "code-output",
        skill: "raciocinio",
        concept: "forms-estrutura",
        prompt:
          "Dentro de um `<form>`, o que acontece ao clicar neste botão?",
        code: { language: "html", code: `<button>Salvar rascunho</button>` },
        options: [
          {
            id: "a",
            text: "Ele envia o formulário — o type padrão de um <button> dentro de <form> é \"submit\"",
          },
          { id: "b", text: "Nada, porque não tem type" },
          { id: "c", text: "Ele limpa o formulário" },
          { id: "d", text: "Abre o menu de contexto" },
        ],
        correctOptionIds: ["a"],
        hint: "Qual é o `type` implícito de um `<button>` sem atributo?",
        explanation:
          "Sem `type`, um `<button>` em um `<form>` age como `submit`. Para um botão que só dispara JS, escreva `type=\"button\"` explicitamente.",
      },
      {
        id: "cp-forms-fieldset-match",
        type: "match",
        skill: "compreensao",
        concept: "forms-estrutura",
        prompt: "Relacione o elemento ao seu uso em formulários:",
        left: [
          { id: "fieldset", text: "<fieldset>" },
          { id: "legend", text: "<legend>" },
          { id: "select", text: "<select> + <option>" },
          { id: "textarea", text: "<textarea>" },
        ],
        right: [
          { id: "r-fieldset", text: "Agrupa campos relacionados (ex.: endereço)" },
          { id: "r-legend", text: "Dá um título ao grupo de campos" },
          { id: "r-select", text: "Escolha de uma opção numa lista pré-definida" },
          { id: "r-textarea", text: "Texto livre de várias linhas" },
        ],
        correctPairs: [
          { leftId: "fieldset", rightId: "r-fieldset" },
          { leftId: "legend", rightId: "r-legend" },
          { leftId: "select", rightId: "r-select" },
          { leftId: "textarea", rightId: "r-textarea" },
        ],
        hint: "Dois deles trabalham em par para dar contexto a um grupo.",
        explanation:
          "`<fieldset>` agrupa e `<legend>` nomeia o grupo; `<select>` é escolha em lista fechada; `<textarea>` é texto longo.",
      },
    ],
  },
};
