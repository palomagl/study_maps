# 🗺️ StudyMaps — tire suas ideias do papel

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Plataforma de trilhas que leva uma pessoa **da ideia até um link publicado**, usando IA — e ensinando a fazer isso bem.

> "Ensina-me o teu caminho, Senhor, e guia-me por uma vereda plana." (Salmos 27:11)

---

## 🎯 O problema

Hoje todo mundo consegue pedir uma coisa para uma IA. O que quase ninguém sabe fazer é **olhar o resultado e dizer o que está errado nele**. Então a pessoa pede, vem algo mediano, ela aceita — porque não sabe que podia ser melhor, nem o que pedir para melhorar. E o projeto morre no preview, sem nunca virar um link.

O StudyMaps existe para interromper esse ciclo.

## 🧭 A tese

O que se ensina aqui não é uma ferramenta, é um **loop**:

1. **Ideia e referência** — juntar referências *antes* de abrir qualquer IA. Sem isso, o resultado é a média da internet, porque foi isso que você pediu.
2. **Especificação** — escrever o que você quer de verdade. A IA é co-autora do pedido, não executora ainda.
3. **Geração** — a ferramenta certa para cada pedaço.
4. **Julgamento** — o passo que ninguém ensina: olhar e **dar nome ao defeito**. "Ficou feio" não é um defeito, é um sentimento, e a IA não conserta sentimento.
5. **Conserto** — pedir a correção específica, em vez de "tenta de novo".
6. **Publicação** — GitHub, depois Vercel ou Render. Repo, build, link.

Claude, ChatGPT, Gemini, Lovable, Pinterest, GitHub e Vercel aparecem como **instrumento dentro do passo em que servem** — nunca como matéria. Ninguém quer fazer a "Trilha GitHub": a pessoa quer o app no ar, e o Git aparece porque é o que falta para chegar lá.

Duas consequências de projeto:

- **Taste não se explica, se compara.** A aula não diz "use referências" — ela mostra o resultado preguiçoso e o resultado com referência, lado a lado, e deixa a pessoa ver.
- **Publicar é a prova.** Ninguém se orgulha de um chat bom; todo mundo se orgulha de um link. O certificado da trilha só é emitido para quem registrou o endereço público do que fez — e diz, nele mesmo, que não tem valor acadêmico.

---

## 🛤️ Trilhas

| Trilha | Estado |
|---|---|
| **Coloque seu primeiro app no ar** | 6 fases, 12 aulas — 1 escrita, as demais em produção |
| Um site com a sua cara | planejada |
| Automatize uma tarefa chata | planejada |
| Da ideia ao projeto de verdade | planejada |

As antigas trilhas de código (Front-end, Back-end, Full-Stack) estão arquivadas em [`src/content/archive/`](src/content/archive/) — fora do currículo, mas preservadas e ainda compiladas.

## ✨ O que o app tem

- **Mapa da trilha** com fases, etapas e aulas, em mapa ou lista.
- **Fluxo de aula**: conteúdo, recursos gratuitos, recomendação paga *com motivo obrigatório*, perguntas com dica e explicação, exercício com checklist, desafio e checkpoint com nota de corte.
- **Questão de julgamento (A/B)**: escolher o melhor resultado e **nomear os defeitos** do pior — corrigida automaticamente e usada na revisão por conceito.
- **Gamificação**: XP por passo, nível, missões e conquistas.
- **Revisão espaçada** dos conceitos que você errou.
- **Progresso local**, sem conta e sem backend.

## 🛠️ Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Framer Motion · React Router · Vitest + Testing Library

## 🚀 Rodando

```bash
npm install
npm run dev     # http://localhost:8080
npm run test    # suíte completa
npx tsc -p tsconfig.app.json --noEmit
```

> O `tsconfig.json` da raiz só tem referências de projeto, então `npx tsc --noEmit` sozinho não compila nada. Use o comando acima.

## 📐 Decisões de projeto

O desenho e o plano de implementação vivem no repositório:

- [`docs/superpowers/specs/`](docs/superpowers/specs/) — a intenção, o porquê, objetivos e anti-objetivos.
- [`docs/superpowers/plans/`](docs/superpowers/plans/) — o plano que executou a virada.

Uma regra atravessa os dois: **nada de inventar**. Nenhum link, vídeo ou curso entra no conteúdo sem ter sido verificado de verdade, e não existem campos de preço, duração ou nota no modelo — justamente para não haver onde chutar.

---

## 🔗 Demonstração

✨ [Acessar StudyMaps](https://study-maps.vercel.app/)

## 📩 Vamos conectar?

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/palomagl)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5551998127367)

---
*Desenvolvido com foco em clareza educacional e design de interface por Paloma Lorenzon.*
