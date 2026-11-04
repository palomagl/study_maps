# Aula interativa, estilo Duolingo — design

**Data:** 04/11/2026 · **Autora:** Paloma · **Status:** aguardando aprovação

## Por quê

A Paloma testou o app e quer que aprender no StudyMaps seja como jogar no
celular: fácil, vivo, com som, um personagem conduzindo — "igual o Duolingo,
uma coisa que ensina". A pesquisa (registrada na conversa de 03–04/11) mostrou:

- a primeira semana decide quem fica, e a primeira aula tem que dar uma vitória rápida;
- o Duolingo e o Brilliant ensinam fazendo, em pedaços curtos, com resposta na hora;
- pra jovem adulto, medalha solta parece infantil; o que prende é recompensa ligada a algo real;
- o Duolingo criou primeiro a **identidade** de cada personagem e só depois a voz.

Hoje a aula do StudyMaps é uma página comprida de 20–30 minutos, com texto, vídeo,
recursos, teste, prática e checkpoint. Funciona no computador, mas não prende no celular.

## Objetivo

Cada aula vira uma sequência de **telas de celular**, conduzida pelo **robô da fase**,
em **pedaços de ~4 minutos**, onde **toda tela pede um toque** e a resposta vem
na hora, com som, reação do robô e vibração.

### Não é objetivo (agora)

- Camada de hábito: meta do dia, aviso de sequência quebrando, ranking — é o próximo projeto.
- Voz gravada ou por serviço pago.
- Conta e login.
- Ícone novo do app — está sendo escolhido à parte (opções I, J, K, L).

### Antiobjetivos — se acontecer, falhou mesmo funcionando

- Ficar infantil (estilo corujinha). O público é 16–25, maioria homens.
- Medalha e ponto sem ligação com o projeto da pessoa.
- Punir: nada de vidas/corações que travam a aula.
- Parede de texto: nenhuma tela com mais de ~3 linhas de leitura sem um toque.
- Quebrar o progresso de quem já fez aulas (agentes, certificado).

## Restrições

- Celular primeiro (375px), funcionando também no computador.
- Vite + React + TypeScript + Tailwind; progresso no navegador (localStorage), como hoje.
- Sem serviço pago. Sons gerados no próprio navegador. Vibração só existe no Android.
- O conteúdo continua verdadeiro e conferido (nenhum preço inventado, links checados).
- Tratamento em "tu".

## Abordagem escolhida

**Aula em cards** (escolhida pela Paloma em 03/11), com a entrada direta. A camada de
hábito ficou como segundo projeto. Descartados: só hábito (traz de volta pra uma aula
que continua longa) e os dois juntos (demora demais pra ver resultado).

## Como fica — o que foi decidido nos protótipos

### O robô conduz

O robô da fase fala em balão, reage e comenta. Cada um tem identidade:

| Robô | Quem é | Bordão | Como fala (bipes) |
|---|---|---|---|
| Ideia | o sonhador acelerado | "E se a gente…?!" | rápido, agudo, empolgado |
| Pedido | o certinho que pergunta tudo | "Mas como assim, exatamente?" | calmo, regular |
| Geração | o fazedor ansioso | "Já tô fazendo!" | muito rápido |
| Julgamento | o chato com bom gosto | "Hmm. Não." | grave, com pausa antes do veredito |
| Conserto | o calmo de poucas palavras | "Um de cada vez." | devagar, baixo |
| No ar | o hype | "Manda o link!" | alto, variando muito |

Entre si, são parças de um time: zoam um ao outro, mas estão sempre do lado da pessoa.

**Voz:** bipes por personagem (tipo personagem de jogo), sincronizados com o texto
aparecendo. A voz falada do navegador foi rejeitada ("voz grossona"). Dá pra desligar o som.

### Uma história do começo ao fim

Cada pedaço segue um personagem com um problema concreto (ex.: o Caio e o app de rolê)
e termina com a pessoa aplicando no **projeto dela**. O que ela escreve fica guardado
e **a aula seguinte começa com isso** — é o que liga uma aula na outra.

### Tipos de tela

1. **Fala do robô** — balão + botão pra seguir.
2. **A dor** — a frase da dor; a pessoa toca "já aconteceu comigo".
3. **O que tu faria?** — a falsa solução vira uma das alternativas; quem escolhe ela vê "Todo mundo faz isso" e por que não resolve.
4. **Escolher** — uma alternativa certa.
5. **Cortar** — tocar no que fica de fora (chips).
6. **Montar** — montar a frase com blocos (banco de palavras).
7. **Julgar A ou B** — o que já existe hoje, em tela cheia.
8. **Escrever a tua** — texto curto que fica guardado e volta depois.
9. **Fim do pedaço** — XP, % de acertos, tempo, combo, **missão no teu projeto**, quanto falta pro robô entrar no time; "Próximo pedaço" ou "Parar por hoje".

### Resposta na hora

- Botão "Verificar" → folha que sobe de baixo, **verde** (acerto) ou **vermelha** (erro), com explicação curta.
- Som de toque, acerto, erro e fim; o robô pula no acerto e se sacode no erro; vibração no Android.
- **Combo** ("🔥 3 seguidas") quando acerta em sequência.
- Errar não trava: explica e segue.

### Estrutura da aula

- 2 ou 3 pedaços por aula, ~4 minutos cada; barra de progresso no topo.
- O vídeo e os recursos (cursos, canais pra acompanhar) aparecem como **extra no fim do pedaço**, fora do caminho.
- O exercício prático de hoje vira a **missão no teu projeto** do fim do pedaço.
- O checkpoint de hoje vira o último pedaço da aula.
- A aula está concluída quando todos os pedaços estão feitos → o progresso, os agentes e o certificado continuam funcionando como hoje. Quem já concluiu uma aula no formato antigo continua com ela concluída.

### Entrada direta

Na primeira visita, em vez do formulário, a pessoa cai direto no primeiro pedaço da
aula 1.1. O nome é pedido no fim desse pedaço ("Como o time te chama?").

## Ordem de entrega

1. O motor das telas (tipos, folha de resposta, sons, bipes, reações, progresso) + **aulas 1.1 e 1.2** escritas no formato novo, com a entrada direta. Sobe pro ar pra Paloma testar no celular.
2. As outras 11 aulas, escritas de novo pra esse formato (não é só converter o texto: cada uma ganha história, telas e falas do robô dela).

## O que fica pro construtor

O visual fino de cada tela (seguindo os protótipos e a identidade roxa já aprovada),
a afinação dos sons e dos bipes, e a escrita das falas dentro das identidades acima.
