import type { Lesson } from "@/content/types";

/**
 * Aula PROVA DE CONCEITO – trilha Front-end, fase "Fundamentos da Web".
 * Conteúdo real. Serve de gabarito para as próximas aulas.
 */
export const comoAInternetFunciona: Lesson = {
  id: "fe-web-01-internet",
  slug: "como-a-internet-funciona",
  title: "Como a Internet Funciona",
  summary:
    "O caminho completo de uma página: do momento em que você digita um endereço até o navegador desenhar a tela.",
  estimatedMinutes: 25,
  status: "available",

  learningObjectives: [
    "Explicar, com suas palavras, o que acontece entre digitar um endereço e a página aparecer",
    "Diferenciar os papéis de DNS, IP, HTTP/HTTPS e TLS",
    "Descrever o modelo cliente–servidor e o ciclo requisição/resposta",
    "Reconhecer, na aba Network do navegador, as requisições que montam uma página",
    "Identificar quando um problema é de DNS, de conexão ou do servidor",
  ],

  content: [
    {
      type: "paragraph",
      text: "Toda vez que você abre um site, dezenas de peças conversam entre si em frações de segundo. Entender essa conversa é o que separa quem **copia código** de quem **sabe por que o código funciona** — e é o que te deixa depurar um site que \"não abre\" sem chutar.",
    },
    {
      type: "callout",
      variant: "analogy",
      title: "Uma analogia",
      text: "Pense em pedir uma pizza. Você precisa do **endereço** da pizzaria (IP), de uma forma de **descobrir esse endereço a partir do nome** (DNS), de um **idioma combinado** para fazer o pedido (HTTP) e, se for pagar no cartão, de uma **linha segura** para passar os dados (TLS/HTTPS). A internet faz exatamente isso, milhões de vezes por segundo.",
    },

    { type: "heading", text: "Cliente e servidor" },
    {
      type: "paragraph",
      text: "A web funciona no modelo **cliente–servidor**. O **cliente** é quem pede (seu navegador, um app de celular, um `curl` no terminal). O **servidor** é uma máquina, sempre ligada, que **espera pedidos e responde**. O cliente nunca \"entra\" no servidor: ele manda uma mensagem e recebe outra de volta. Esse par é a **requisição** e a **resposta**.",
    },
    {
      type: "list",
      items: [
        "**Cliente**: inicia a conversa, faz uma pergunta por vez.",
        "**Servidor**: não inicia nada; responde ao que foi pedido.",
        "**Requisição/Resposta**: cada recurso da página (o HTML, cada CSS, cada imagem) é um par desses.",
      ],
    },

    { type: "heading", text: "Passo 1 — Do nome ao número: DNS" },
    {
      type: "paragraph",
      text: "Computadores se encontram na rede por **endereços IP** (`142.250.219.68` ou `2800:3f0:...` no IPv6), não por nomes. O **DNS** (Domain Name System) é a \"agenda de contatos\" da internet: ele traduz `curso.exemplo.com` no IP do servidor. Seu navegador pergunta a um **resolver** (geralmente do seu provedor ou algo como `1.1.1.1`), que vai subindo a hierarquia até achar a resposta e devolve — normalmente em poucos milissegundos. O resultado fica em **cache** por um tempo, então a segunda visita pula essa etapa.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Um mesmo domínio pode responder com **vários IPs diferentes** — é assim que grandes sites distribuem carga entre servidores e CDNs pelo mundo.",
    },

    { type: "heading", text: "Passo 2 — Abrir uma conexão: TCP e TLS" },
    {
      type: "paragraph",
      text: "Com o IP em mãos, o navegador abre uma conexão **TCP** com o servidor (um aperto de mão de 3 etapas que garante que os dois lados estão prontos). Se o endereço é **HTTPS**, logo em seguida acontece o **handshake TLS**: os dois combinam uma chave secreta e, a partir daí, **tudo trafega criptografado**. É o cadeado da barra de endereço. Sem HTTPS, qualquer ponto no caminho (o Wi-Fi da cafeteria, o provedor) poderia ler ou alterar os dados.",
    },

    { type: "heading", text: "Passo 3 — O pedido: HTTP" },
    {
      type: "paragraph",
      text: "Agora o cliente fala a língua da web: **HTTP**. Uma requisição é só texto estruturado — um **método** (`GET` para buscar, `POST` para enviar), um **caminho**, e **cabeçalhos** (quem sou eu, que formatos aceito, cookies…). O servidor responde com um **status** (`200 OK`, `404 Not Found`, `500` erro no servidor), seus próprios cabeçalhos e, no corpo, o conteúdo — o HTML, por exemplo.",
    },
    {
      type: "code",
      language: "http",
      caption: "Uma requisição GET e o começo da resposta (simplificado)",
      code: `GET /index.html HTTP/1.1
Host: curso.exemplo.com
Accept: text/html

--- resposta ---

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<!doctype html>
<html> ... </html>`,
    },
    {
      type: "callout",
      variant: "tip",
      title: "Na prática",
      text: "Abra qualquer site, pressione F12 e vá na aba **Network**. Recarregue a página: cada linha ali é um par requisição/resposta. A primeira costuma ser o documento HTML; as seguintes são CSS, JS, fontes e imagens que o HTML pediu.",
    },

    { type: "heading", text: "Passo 4 — Montar a tela: renderização" },
    {
      type: "paragraph",
      text: "O navegador **não espera** o HTML inteiro para começar. Ele lê de cima para baixo, constrói o **DOM** (a árvore de elementos), e sempre que encontra um `<link rel=\"stylesheet\">`, um `<script>` ou um `<img>`, **dispara novas requisições** por esses arquivos. Com o CSS ele monta o **CSSOM**, combina os dois numa árvore de renderização, calcula posições e tamanhos (**layout**) e finalmente **pinta** os pixels. JavaScript pode alterar o DOM depois disso, e o ciclo se repete.",
    },
    {
      type: "example",
      title: "Por que a primeira visita é mais lenta",
      text: "Na primeira vez: resolver DNS + handshake TCP/TLS + baixar HTML + baixar cada CSS/JS/imagem. Na segunda: o DNS está em cache, a conexão pode ser reaproveitada e a maioria dos arquivos já está no cache do navegador. Por isso um `Ctrl+R` costuma ser bem mais rápido que abrir o site do zero.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Diagnóstico rápido",
      text: "\"O site não abre\": se você acessa pelo **IP direto** mas não pelo nome, é **DNS**. Se nem o IP responde, é **conexão/servidor**. Se abre mas dá `500`, o problema está **no servidor**, não em você.",
    },
  ],

  video: {
    title: "Como a Internet funciona?",
    provider: "YouTube",
    channel: "Curso em Vídeo",
    url: "https://www.youtube.com/watch?v=nlO5hySqJFA",
    description:
      "Panorama em português de pacotes, protocolos, servidores e o caminho de uma requisição pela rede.",
    lang: "pt-BR",
  },

  freeResources: [
    {
      kind: "docs",
      title: "Como a Internet funciona",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work",
      description: "Explicação oficial, com diagramas, de redes, IP e roteamento.",
      lang: "pt-BR",
    },
    {
      kind: "docs",
      title: "O que acontece quando você digita uma URL e aperta Enter",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work",
      description: "Do DNS ao pixel: o caminho completo, passo a passo.",
      lang: "en",
    },
    {
      kind: "article",
      title: "O que é DNS? Como o DNS funciona",
      provider: "Cloudflare Learning",
      url: "https://www.cloudflare.com/pt-br/learning/dns/what-is-dns/",
      description: "Detalha resolvers, servidores raiz, TLD e cache de DNS.",
      lang: "pt-BR",
    },
    {
      kind: "article",
      title: "Uma visão geral do HTTP",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview",
      description: "Métodos, status, cabeçalhos e o formato das mensagens HTTP.",
      lang: "pt-BR",
    },
  ],

  premiumResources: [
    {
      title: "Formação: Fundamentos da Web",
      platform: "Alura",
      url: "https://www.alura.com.br/",
      reason:
        "Se você quer uma trilha guiada de redes, HTTP e infraestrutura antes de entrar em HTML/CSS, a formação cobre esses fundamentos com exercícios e projetos.",
    },
  ],

  questions: [
    {
      id: "q-internet-dns-scenario",
      type: "single",
      skill: "aplicacao",
      concept: "dns",
      prompt:
        "Você digita `www.exemplo.com` e aperta Enter. Antes de qualquer conteúdo chegar, qual serviço traduz esse nome no endereço numérico do servidor?",
      options: [
        { id: "a", text: "DNS" },
        { id: "b", text: "HTTP" },
        { id: "c", text: "TLS" },
        { id: "d", text: "O cache do navegador" },
      ],
      correctOptionIds: ["a"],
      hint: "Pense em qual peça funciona como uma 'agenda de contatos' — de nome para número.",
      explanation:
        "O DNS resolve o nome de domínio para um endereço IP. HTTP só entra depois, para fazer o pedido; TLS cuida da criptografia; o cache pode guardar a resposta do DNS, mas quem faz a tradução é o DNS.",
    },
    {
      id: "q-internet-https-boolean",
      type: "boolean",
      skill: "compreensao",
      concept: "https",
      prompt:
        "Em uma conexão HTTPS, os dados trocados entre o navegador e o servidor trafegam criptografados, de modo que um intermediário na rede não consegue lê-los em texto puro.",
      options: [
        { id: "t", text: "Verdadeiro" },
        { id: "f", text: "Falso" },
      ],
      correctOptionIds: ["t"],
      hint: "Lembre do handshake TLS e do cadeado na barra de endereço.",
      explanation:
        "Verdadeiro. O handshake TLS combina uma chave secreta entre as pontas; a partir daí o conteúdo trafega cifrado. Sem HTTPS, o Wi-Fi da cafeteria ou o provedor poderiam ler e até alterar os dados.",
    },
    {
      id: "q-internet-request-order",
      type: "order",
      skill: "raciocinio",
      concept: "request-lifecycle",
      prompt:
        "Coloque em ordem o que acontece quando você abre um site pela primeira vez:",
      items: [
        { id: "dns", text: "O navegador resolve o domínio para um IP via DNS" },
        { id: "conn", text: "O navegador abre uma conexão TCP/TLS com o servidor" },
        { id: "req", text: "O navegador envia a requisição HTTP GET do documento" },
        { id: "resp", text: "O servidor responde com o HTML" },
        { id: "render", text: "O navegador monta o DOM e busca CSS, JS e imagens" },
      ],
      correctOrder: ["dns", "conn", "req", "resp", "render"],
      hint: "Você só consegue conectar depois de ter o endereço; e só pede o HTML depois de conectar.",
      explanation:
        "Primeiro descobrir o endereço (DNS), depois estabelecer a conexão (TCP + TLS), então pedir o documento (GET), receber o HTML e, por fim, renderizar — o que dispara as requisições dos demais recursos.",
    },
    {
      id: "q-internet-protocols-match",
      type: "match",
      skill: "compreensao",
      concept: "web-protocols",
      prompt: "Relacione cada peça ao seu papel:",
      left: [
        { id: "dns", text: "DNS" },
        { id: "ip", text: "IP" },
        { id: "http", text: "HTTP" },
        { id: "tls", text: "TLS" },
      ],
      right: [
        { id: "r-dns", text: "Traduz nomes de domínio em endereços numéricos" },
        { id: "r-ip", text: "Endereço que identifica um dispositivo na rede" },
        { id: "r-http", text: "Formato das mensagens de pedido e resposta" },
        { id: "r-tls", text: "Camada que criptografa a conexão" },
      ],
      correctPairs: [
        { leftId: "dns", rightId: "r-dns" },
        { leftId: "ip", rightId: "r-ip" },
        { leftId: "http", rightId: "r-http" },
        { leftId: "tls", rightId: "r-tls" },
      ],
      hint: "Duas peças cuidam de 'onde' (endereço), uma cuida de 'como falar' e uma cuida de 'em segredo'.",
      explanation:
        "DNS = nome→número; IP = o número em si; HTTP = o idioma do pedido/resposta; TLS = o envelope lacrado por cima de tudo.",
    },
    {
      id: "q-internet-troubleshoot",
      type: "single",
      skill: "raciocinio",
      concept: "dns-troubleshooting",
      prompt:
        "Um colega diz que `loja.exemplo.com` \"não abre\". Você testa e também falha pelo nome — mas o site carrega normalmente se você acessa direto pelo IP do servidor. Qual é a causa mais provável?",
      options: [
        { id: "a", text: "O servidor está fora do ar" },
        { id: "b", text: "A resolução de DNS do domínio está falhando" },
        { id: "c", text: "O certificado HTTPS expirou" },
        { id: "d", text: "O HTML da página está corrompido" },
      ],
      correctOptionIds: ["b"],
      hint: "O que muda entre acessar pelo nome e acessar pelo número?",
      explanation:
        "Se o IP responde e o nome não, o servidor está no ar e o conteúdo está ok — o elo quebrado é a tradução nome→IP, ou seja, o DNS.",
    },
  ],

  exercise: {
    id: "ex-internet-network-tab",
    title: "Investigue uma página real na aba Network",
    statement:
      "Abra um site que você usa (ex.: um portal de notícias), pressione F12, vá na aba Network e recarregue a página com o gravador ligado. Sua missão é ler o que aconteceu.",
    steps: [
      "Identifique a PRIMEIRA requisição da lista (o documento) e anote o status HTTP dela.",
      "Conte quantas requisições no total a página fez para carregar.",
      "Encontre pelo menos uma requisição de CSS, uma de JavaScript e uma de imagem.",
      "Clique em uma requisição e localize, nos cabeçalhos, o `Content-Type` da resposta.",
      "Recarregue de novo e observe quais recursos vieram do cache (tamanho aparece como 'disk cache' / 'memory cache').",
    ],
    hints: [
      "Se a lista estiver vazia, ela só grava a partir do momento em que a aba está aberta — recarregue com o F12 já aberto.",
      "O filtro no topo (Doc, CSS, JS, Img) ajuda a separar por tipo.",
    ],
    selfCheck: [
      "Sei dizer o status HTTP do documento principal",
      "Sei quantas requisições a página fez e consigo apontar CSS, JS e imagem",
      "Localizei um cabeçalho Content-Type numa resposta",
      "Entendi, olhando os tamanhos, o que veio do cache na segunda carga",
    ],
  },

  challenge: {
    id: "ch-internet-trace",
    title: "Rastreie o caminho até um servidor",
    statement:
      "Use as ferramentas de linha de comando do seu sistema para observar, na prática, a resolução de nome e o caminho de rede até um site.",
    requirements: [
      "Rode `nslookup dev.mozilla.org` (ou `dig dev.mozilla.org`) e anote o(s) IP(s) retornado(s).",
      "Rode o comando de novo para outro domínio grande e verifique se ele retorna mais de um IP.",
      "Rode `ping` no domínio e observe o tempo de resposta em milissegundos.",
      "Rode `tracert` (Windows) ou `traceroute` (Linux/macOS) e conte quantos saltos (roteadores) existem entre você e o servidor.",
      "Escreva 3 a 5 frases explicando, com seus dados, o trajeto que um pacote fez.",
    ],
    hints: [
      "No Windows os comandos são `nslookup`, `ping` e `tracert`; em Linux/macOS, `dig`/`nslookup`, `ping` e `traceroute`.",
      "Alguns servidores bloqueiam `ping`/`traceroute` — se um domínio não responder, tente outro.",
    ],
  },

  checkpoint: {
    id: "cp-internet",
    passThreshold: 4,
    successMessage: "🎉 CHECKPOINT CONCLUÍDO — você entende o caminho de uma página na web.",
    questions: [
      {
        id: "cp-internet-render-first",
        type: "single",
        skill: "compreensao",
        concept: "rendering",
        prompt:
          "O navegador acabou de receber os primeiros bytes do HTML. O que ele faz em seguida?",
        options: [
          {
            id: "a",
            text: "Espera o HTML inteiro chegar para só então começar a processar",
          },
          {
            id: "b",
            text: "Começa a montar o DOM de cima para baixo e já dispara requisições para o CSS, JS e imagens que encontra",
          },
          { id: "c", text: "Pinta a tela inteira de branco até o JavaScript rodar" },
          { id: "d", text: "Refaz a resolução de DNS para confirmar o endereço" },
        ],
        correctOptionIds: ["b"],
        hint: "Lembre que a renderização é incremental — o navegador não é paciente.",
        explanation:
          "O parser trabalha em streaming: monta o DOM conforme lê e, a cada recurso referenciado, abre uma nova requisição em paralelo.",
      },
      {
        id: "cp-internet-not-secure",
        type: "single",
        skill: "aplicacao",
        concept: "https",
        prompt:
          "Numa rede pública, `banco.exemplo.com` aparece como \"Não seguro\", sem cadeado. O que isso indica na prática?",
        options: [
          { id: "a", text: "O site está fora do ar" },
          {
            id: "b",
            text: "A conexão não usa HTTPS/TLS, então os dados podem trafegar sem criptografia e ser lidos ou alterados no caminho",
          },
          { id: "c", text: "O DNS não conseguiu resolver o domínio" },
          { id: "d", text: "O navegador está desatualizado" },
        ],
        correctOptionIds: ["b"],
        hint: "O cadeado está ligado a qual das camadas que estudamos?",
        explanation:
          "Sem HTTPS não há handshake TLS; o tráfego vai em texto puro e qualquer ponto intermediário da rede pode bisbilhotar ou adulterar.",
      },
      {
        id: "cp-internet-multi-ip",
        type: "boolean",
        skill: "compreensao",
        concept: "dns",
        prompt:
          "Um mesmo domínio pode estar associado a vários endereços IP diferentes ao mesmo tempo.",
        options: [
          { id: "t", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["t"],
        hint: "Como sites gigantes atendem o mundo todo sem um único servidor?",
        explanation:
          "Verdadeiro. Distribuir um domínio entre vários IPs é a base de balanceamento de carga e de CDNs.",
      },
      {
        id: "cp-internet-topology-order",
        type: "order",
        skill: "raciocinio",
        concept: "network-topology",
        prompt:
          "Ordene os elementos do MAIS próximo de você até o MAIS distante, no caminho de uma requisição:",
        items: [
          { id: "browser", text: "Seu navegador" },
          { id: "lan", text: "Sua rede local / Wi-Fi" },
          { id: "isp", text: "Seu provedor de internet (ISP)" },
          { id: "dns", text: "O servidor DNS consultado" },
          { id: "origin", text: "O servidor de origem do site" },
        ],
        correctOrder: ["browser", "lan", "isp", "dns", "origin"],
        hint: "Comece pelo que está na sua máquina e vá saindo para a internet.",
        explanation:
          "O pedido sai do navegador, passa pela sua rede local, chega ao provedor, que encaminha a consulta ao DNS e, por fim, ao servidor de origem.",
      },
      {
        id: "cp-internet-first-load",
        type: "single",
        skill: "raciocinio",
        concept: "caching",
        prompt:
          "Por que abrir um site pela primeira vez costuma ser sensivelmente mais lento do que recarregá-lo logo em seguida?",
        options: [
          {
            id: "a",
            text: "Na primeira vez é preciso resolver DNS, abrir conexão TCP/TLS e baixar todos os recursos; depois, DNS, conexão e arquivos já estão em cache",
          },
          { id: "b", text: "O servidor prioriza visitantes recorrentes" },
          { id: "c", text: "O navegador comprime o HTML só a partir da segunda visita" },
          { id: "d", text: "A primeira visita sempre usa uma rota de rede mais longa" },
        ],
        correctOptionIds: ["a"],
        hint: "O que a segunda carga consegue PULAR?",
        explanation:
          "A recarga reaproveita a resolução de DNS em cache, muitas vezes a mesma conexão e, principalmente, os arquivos já guardados no cache do navegador.",
      },
    ],
  },
};
