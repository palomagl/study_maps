import type { Trail } from "@/content/types";
import { draftLesson } from "@/content/draft";

/**
 * Trilha Back-end. Estrutura completa de fases/etapas; aulas em `draft`
 * (conteúdo entra depois da prova de conceito da trilha Front-end).
 */
export const backendTrail: Trail = {
  id: "backend",
  title: "Back-end",
  subtitle: "Node.js, APIs, Bancos de Dados e DevOps",
  description:
    "O que roda no servidor: lógica, APIs, dados que persistem, segurança e deploy. A parte que o usuário não vê, mas sem a qual nada funciona.",
  glowClass: "glow-purple",
  colorClass: "text-neon-purple",
  accentHsl: "270 100% 65%",

  phases: [
    {
      id: "be-p1",
      title: "Fundamentos do Servidor",
      description: "Como servidores conversam e como pensar um algoritmo.",
      stages: [
        {
          id: "be-s1",
          title: "Redes e Protocolos",
          description: "Cliente–servidor, HTTP, métodos, status e REST.",
          difficulty: "iniciante",
          lessons: [
            draftLesson({
              id: "be-net-01-http",
              slug: "http-e-cliente-servidor",
              title: "HTTP e cliente–servidor",
              summary: "O ciclo requisição/resposta e o vocabulário do HTTP.",
            }),
          ],
        },
        {
          id: "be-s2",
          title: "Lógica de Programação",
          description: "Algoritmos, estruturas básicas e complexidade.",
          difficulty: "iniciante",
          lessons: [
            draftLesson({
              id: "be-logic-01-algoritmos",
              slug: "algoritmos-e-big-o",
              title: "Algoritmos e noção de Big-O",
              summary: "Resolver problemas passo a passo e medir o custo.",
            }),
          ],
        },
      ],
    },
    {
      id: "be-p2",
      title: "APIs com Node.js",
      description: "Construir a interface que o front-end consome.",
      stages: [
        {
          id: "be-s3",
          title: "Node.js e Runtime",
          description: "Event loop, módulos, NPM, file system e streams.",
          difficulty: "iniciante",
          evolutionMoment: "🛠️ Agora você roda JavaScript fora do navegador.",
          lessons: [
            draftLesson({
              id: "be-node-01-runtime",
              slug: "runtime-e-modulos",
              title: "Runtime e módulos",
              summary: "O que o Node é, o event loop e como importar código.",
            }),
          ],
        },
        {
          id: "be-s4",
          title: "APIs RESTful com Express",
          description: "Rotas, middlewares, validação e tratamento de erros.",
          difficulty: "intermediario",
          evolutionMoment: "🔌 Agora outras aplicações podem falar com a sua.",
          lessons: [
            draftLesson({
              id: "be-api-01-rotas",
              slug: "rotas-e-middlewares",
              title: "Rotas e middlewares",
              summary: "Estruturar uma API que responde de forma previsível.",
            }),
          ],
        },
      ],
    },
    {
      id: "be-p3",
      title: "Dados e Segurança",
      description: "Persistir informação e proteger quem usa o sistema.",
      stages: [
        {
          id: "be-s5",
          title: "Bancos de Dados SQL",
          description: "Modelagem relacional, queries, joins e ORM.",
          difficulty: "intermediario",
          evolutionMoment: "💾 Agora seus dados sobrevivem a um restart.",
          lessons: [
            draftLesson({
              id: "be-sql-01-modelagem",
              slug: "modelagem-relacional",
              title: "Modelagem relacional",
              summary: "Tabelas, chaves, relacionamentos e normalização.",
            }),
          ],
        },
        {
          id: "be-s6",
          title: "Bancos NoSQL",
          description: "Documentos com MongoDB, cache com Redis e trade-offs.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "be-nosql-01-documentos",
              slug: "documentos-e-cache",
              title: "Documentos e cache",
              summary: "Quando um banco de documentos ganha do relacional.",
            }),
          ],
        },
        {
          id: "be-s7",
          title: "Autenticação e Segurança",
          description: "JWT, hashing de senha, OAuth, CORS e OWASP Top 10.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "be-auth-01-jwt",
              slug: "sessao-e-jwt",
              title: "Sessão e JWT",
              summary: "Identificar quem está do outro lado da requisição.",
            }),
          ],
        },
      ],
    },
    {
      id: "be-p4",
      title: "Qualidade e Operação",
      description: "Testar, empacotar e publicar com confiança.",
      stages: [
        {
          id: "be-s8",
          title: "Testes e Qualidade",
          description: "Testes unitários, de integração e cobertura.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "be-test-01-unit",
              slug: "testes-de-api",
              title: "Testes de API",
              summary: "Garantir que a API continua respondendo o esperado.",
            }),
          ],
        },
        {
          id: "be-s9",
          title: "Docker e Deploy",
          description: "Containers, docker-compose, CI/CD e monitoramento.",
          difficulty: "avancado",
          evolutionMoment: "🚀 Sua API roda igual na sua máquina e na nuvem.",
          lessons: [
            draftLesson({
              id: "be-ops-01-docker",
              slug: "containers-e-ci-cd",
              title: "Containers e CI/CD",
              summary: "Empacotar a aplicação e automatizar o deploy.",
            }),
          ],
        },
      ],
    },
  ],

  projects: [
    {
      id: "be-proj-crud",
      title: "API CRUD",
      tagline: "Sua primeira API de verdade",
      description:
        "API REST completa para um recurso (ex.: tarefas), com validação e persistência em banco.",
      difficulty: "iniciante",
      technologies: ["Node.js", "Express", "PostgreSQL"],
      skills: ["Rotas REST", "Validação", "Acesso a banco"],
      features: ["Criar/listar/editar/remover", "Validação de entrada", "Paginação", "Tratamento de erros"],
      unlockedAfterPhaseId: "be-p2",
    },
    {
      id: "be-proj-auth",
      title: "Serviço de Autenticação",
      tagline: "Proteger o que importa",
      description:
        "Registro, login, hashing de senha, emissão e verificação de tokens e rotas protegidas.",
      difficulty: "intermediario",
      technologies: ["Node.js", "JWT", "bcrypt"],
      skills: ["Segurança", "Middlewares", "Modelagem de usuários"],
      features: ["Registro e login", "Refresh token", "Rotas protegidas", "Recuperação de senha"],
      unlockedAfterPhaseId: "be-p3",
    },
    {
      id: "be-proj-scheduling",
      title: "Sistema de Agendamento",
      tagline: "Regras de negócio no mundo real",
      description:
        "API para marcar horários com prevenção de conflito, disponibilidade e notificações.",
      difficulty: "avancado",
      technologies: ["Node.js", "PostgreSQL", "Redis"],
      skills: ["Modelagem de domínio", "Concorrência", "Filas e cache"],
      features: ["Grade de disponibilidade", "Bloqueio de conflitos", "Cancelamento", "Fila de notificações"],
      unlockedAfterPhaseId: "be-p3",
    },
    {
      id: "be-proj-chat",
      title: "Backend de Chat",
      tagline: "Tempo real",
      description:
        "Servidor de mensagens com WebSocket, salas, histórico e presença de usuários.",
      difficulty: "avancado",
      technologies: ["Node.js", "WebSocket", "MongoDB"],
      skills: ["Conexões persistentes", "Broadcast", "Escalabilidade"],
      features: ["Salas", "Histórico", "Status online", "Entrega e leitura"],
      unlockedAfterPhaseId: "be-p4",
    },
  ],
};
