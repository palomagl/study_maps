import type { Trail } from "@/content/types";
import { draftLesson } from "@/content/draft";
import { comoAInternetFunciona } from "@/content/lessons/fe-como-a-internet-funciona";
import { htmlTagsEEstrutura } from "@/content/lessons/fe-html-01-tags";
import { htmlFormulariosEAcessibilidade } from "@/content/lessons/fe-html-02-forms";
import { cssBoxModelESeletores } from "@/content/lessons/fe-css-01-box-model";
import { cssFlexboxGridResponsividade } from "@/content/lessons/fe-css-02-layout";

/**
 * Trilha Front-end.
 * Fase 1 (Fundamentos da Web) está com conteúdo completo: "Como a Internet
 * Funciona", HTML (2 aulas) e CSS (2 aulas). As demais fases seguem como
 * `draft` — a estrutura existe, o conteúdo entra nas próximas etapas.
 */
export const frontendTrail: Trail = {
  id: "frontend",
  title: "Front-end",
  subtitle: "HTML, CSS, JavaScript e React",
  description:
    "Do primeiro parágrafo de HTML até uma aplicação React no ar. Você aprende a construir interfaces que as pessoas usam.",
  glowClass: "glow-blue",
  colorClass: "text-neon-blue",
  accentHsl: "220 100% 60%",

  phases: [
    {
      id: "fe-p1",
      title: "Fundamentos da Web",
      description:
        "Como a web funciona por baixo dos panos e as duas linguagens que descrevem toda página: HTML e CSS.",
      stages: [
        {
          id: "fe-s1",
          title: "Como a Web Funciona",
          description:
            "O caminho de uma página, do endereço digitado ao pixel na tela.",
          difficulty: "iniciante",
          lessons: [comoAInternetFunciona],
        },
        {
          id: "fe-s2",
          title: "Estrutura com HTML",
          description:
            "Tags semânticas, formulários, acessibilidade e a base de SEO.",
          difficulty: "iniciante",
          evolutionMoment: "🎉 Você acaba de construir sua primeira página.",
          lessons: [htmlTagsEEstrutura, htmlFormulariosEAcessibilidade],
        },
        {
          id: "fe-s3",
          title: "Estilo com CSS",
          description: "Seletores, box model, Flexbox, Grid e responsividade.",
          difficulty: "iniciante",
          evolutionMoment:
            "🎨 Agora você consegue transformar estrutura em interface.",
          lessons: [cssBoxModelESeletores, cssFlexboxGridResponsividade],
        },
      ],
    },
    {
      id: "fe-p2",
      title: "Programação com JavaScript",
      description:
        "A linguagem que faz a página pensar: lógica, o DOM, JavaScript moderno e tipagem com TypeScript.",
      stages: [
        {
          id: "fe-s4",
          title: "Lógica e JavaScript",
          description:
            "Variáveis, funções, arrays, objetos, manipulação do DOM e eventos.",
          difficulty: "iniciante",
          evolutionMoment: "⚡ Agora suas páginas começam a pensar.",
          lessons: [
            draftLesson({
              id: "fe-js-01-fundamentos",
              slug: "fundamentos-da-linguagem",
              title: "Fundamentos da linguagem",
              summary: "Tipos, condições, laços e funções na prática.",
            }),
            draftLesson({
              id: "fe-js-02-dom",
              slug: "dom-e-eventos",
              title: "DOM e eventos",
              summary: "Ler, criar e reagir a mudanças na página.",
            }),
          ],
        },
        {
          id: "fe-s5",
          title: "JavaScript Moderno (ES6+)",
          description:
            "Arrow functions, destructuring, módulos, Promises e async/await.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "fe-es6-01-sintaxe",
              slug: "sintaxe-moderna",
              title: "Sintaxe moderna",
              summary: "Escrever menos e com mais clareza.",
            }),
            draftLesson({
              id: "fe-es6-02-async",
              slug: "promises-e-async-await",
              title: "Promises e async/await",
              summary: "Lidar com código que não termina na hora.",
            }),
          ],
        },
        {
          id: "fe-s6",
          title: "TypeScript",
          description: "Tipagem estática, interfaces, generics e integração.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "fe-ts-01-tipos",
              slug: "tipos-e-interfaces",
              title: "Tipos e interfaces",
              summary: "Descrever o formato dos dados e deixar o editor te ajudar.",
            }),
          ],
        },
      ],
    },
    {
      id: "fe-p3",
      title: "Construindo com React",
      description:
        "Componentizar interfaces, gerenciar estado e estilizar como se faz hoje no mercado.",
      stages: [
        {
          id: "fe-s7",
          title: "React",
          description: "Componentes, JSX, props, estado e hooks.",
          difficulty: "intermediario",
          evolutionMoment: "⚛️ Agora você está construindo aplicações.",
          lessons: [
            draftLesson({
              id: "fe-react-01-componentes",
              slug: "componentes-e-props",
              title: "Componentes e props",
              summary: "Quebrar a interface em peças reutilizáveis.",
            }),
            draftLesson({
              id: "fe-react-02-estado",
              slug: "estado-e-hooks",
              title: "Estado e hooks",
              summary: "useState, useEffect e o ciclo de renderização.",
            }),
          ],
        },
        {
          id: "fe-s8",
          title: "Estilização Moderna",
          description: "Tailwind CSS, design tokens e componentes consistentes.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "fe-style-01-tailwind",
              slug: "tailwind-na-pratica",
              title: "Tailwind na prática",
              summary: "Utilitários, tema e responsividade sem sair do HTML.",
            }),
          ],
        },
      ],
    },
    {
      id: "fe-p4",
      title: "Fluxo Profissional",
      description:
        "Versionar código, configurar o ambiente e colocar projetos no ar.",
      stages: [
        {
          id: "fe-s9",
          title: "Ferramentas e Versionamento",
          description: "Git, GitHub, Vite, ESLint e Prettier.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "fe-tools-01-git",
              slug: "git-e-github",
              title: "Git e GitHub",
              summary: "Commits, branches, pull requests e trabalho em equipe.",
            }),
          ],
        },
        {
          id: "fe-s10",
          title: "Deploy e Projeto Final",
          description: "Build de produção, deploy na Vercel/Netlify e portfólio.",
          difficulty: "intermediario",
          evolutionMoment:
            "🚀 Seu projeto está no ar, com um endereço que você pode compartilhar.",
          lessons: [
            draftLesson({
              id: "fe-deploy-01-vercel",
              slug: "deploy-e-dominio",
              title: "Deploy e domínio",
              summary: "Do repositório ao site publicado, com CI automático.",
            }),
          ],
        },
      ],
    },
  ],

  projects: [
    {
      id: "fe-proj-landing",
      title: "Landing Page",
      tagline: "Sua primeira página no ar",
      description:
        "Uma página de apresentação de produto: cabeçalho, seções, chamada para ação e rodapé, responsiva.",
      difficulty: "iniciante",
      technologies: ["HTML", "CSS"],
      skills: ["Estrutura semântica", "Layout responsivo", "Deploy"],
      features: ["Menu fixo", "Seção hero", "Grid de benefícios", "Formulário de contato"],
      unlockedAfterPhaseId: "fe-p1",
    },
    {
      id: "fe-proj-todo",
      title: "To-do List",
      tagline: "A página começa a reagir a você",
      description:
        "Lista de tarefas com adicionar, concluir, remover e persistência no navegador.",
      difficulty: "iniciante",
      technologies: ["HTML", "CSS", "JavaScript"],
      skills: ["Manipulação de DOM", "Eventos", "localStorage"],
      features: ["Adicionar/remover tarefa", "Marcar como concluída", "Filtro por status", "Salvar entre sessões"],
      unlockedAfterPhaseId: "fe-p2",
    },
    {
      id: "fe-proj-weather",
      title: "App de Clima",
      tagline: "Consumindo dados do mundo real",
      description:
        "Busca por cidade e exibição da previsão consumindo uma API pública.",
      difficulty: "intermediario",
      technologies: ["JavaScript", "Fetch API"],
      skills: ["Requisições HTTP", "async/await", "Tratamento de erro e loading"],
      features: ["Busca por cidade", "Estado de carregamento", "Tratamento de cidade não encontrada", "Ícones por condição"],
      unlockedAfterPhaseId: "fe-p2",
    },
    {
      id: "fe-proj-movies",
      title: "Catálogo de Filmes",
      tagline: "Uma aplicação de verdade",
      description:
        "SPA em React que lista filmes, permite buscar, ver detalhes e favoritar.",
      difficulty: "intermediario",
      technologies: ["React", "React Router", "API REST"],
      skills: ["Componentização", "Roteamento", "Estado global", "Cache de dados"],
      features: ["Listagem paginada", "Busca", "Página de detalhes", "Favoritos persistentes"],
      unlockedAfterPhaseId: "fe-p3",
    },
    {
      id: "fe-proj-dashboard",
      title: "Dashboard",
      tagline: "O nível que você quer alcançar",
      description:
        "Painel com gráficos, tabela com filtros e tema claro/escuro — o tipo de tela que empresas pagam para construir.",
      difficulty: "avancado",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Biblioteca de gráficos"],
      skills: ["Arquitetura de componentes", "Tipagem", "Visualização de dados", "Design system"],
      features: ["Cards de métricas", "Gráficos interativos", "Tabela com ordenação e filtro", "Tema claro/escuro"],
      unlockedAfterPhaseId: "fe-p4",
    },
  ],
};
