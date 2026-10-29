import type { Trail } from "@/content/types";
import { draftLesson } from "@/content/draft";

/**
 * Trilha Full-Stack. Estrutura completa; aulas em `draft` por ora.
 */
export const fullstackTrail: Trail = {
  id: "fullstack",
  title: "Full-Stack",
  subtitle: "Front-end + Back-end + DevOps integrados",
  description:
    "As duas pontas conectadas: uma interface React que conversa com uma API Node, com banco, autenticação e deploy. Construir um sistema inteiro, sozinho.",
  glowClass: "glow-green",
  colorClass: "text-neon-green",
  accentHsl: "150 100% 50%",

  phases: [
    {
      id: "fs-p1",
      title: "Visão de Sistema",
      description: "Enxergar a aplicação inteira antes de escrever a primeira linha.",
      stages: [
        {
          id: "fs-s1",
          title: "Arquitetura Web Moderna",
          description:
            "Responsabilidades de cada camada e como os dados fluem entre elas.",
          difficulty: "iniciante",
          lessons: [
            draftLesson({
              id: "fs-arch-01-camadas",
              slug: "camadas-e-fluxo-de-dados",
              title: "Camadas e fluxo de dados",
              summary: "Cliente, API, banco e o caminho de uma informação entre eles.",
            }),
          ],
        },
      ],
    },
    {
      id: "fs-p2",
      title: "As Duas Pontas",
      description: "Construir o front em React e o back em Node com propósito.",
      stages: [
        {
          id: "fs-s2",
          title: "Front-end com React + TypeScript",
          description: "SPA tipada, roteamento e estado global.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "fs-front-01-spa",
              slug: "spa-tipada",
              title: "SPA tipada",
              summary: "Estruturar um front-end que escala.",
            }),
          ],
        },
        {
          id: "fs-s3",
          title: "Back-end com Node + Express",
          description: "API robusta, middlewares e erros globais.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "fs-back-01-api",
              slug: "api-robusta",
              title: "API robusta",
              summary: "Padrões que evitam retrabalho.",
            }),
          ],
        },
        {
          id: "fs-s4",
          title: "Banco de Dados + ORM",
          description: "PostgreSQL com Prisma, migrations e queries.",
          difficulty: "intermediario",
          evolutionMoment: "💾 Sua aplicação tem memória permanente.",
          lessons: [
            draftLesson({
              id: "fs-db-01-orm",
              slug: "prisma-e-migrations",
              title: "Prisma e migrations",
              summary: "Evoluir o schema sem quebrar dados.",
            }),
          ],
        },
      ],
    },
    {
      id: "fs-p3",
      title: "Integração",
      description: "Ligar front e back e cuidar de autenticação de ponta a ponta.",
      stages: [
        {
          id: "fs-s5",
          title: "Autenticação Full-Stack",
          description: "Login com JWT, proteção de rotas no front e no back, refresh.",
          difficulty: "intermediario",
          lessons: [
            draftLesson({
              id: "fs-auth-01-e2e",
              slug: "auth-de-ponta-a-ponta",
              title: "Auth de ponta a ponta",
              summary: "Do formulário de login à rota protegida na API.",
            }),
          ],
        },
        {
          id: "fs-s6",
          title: "Front + Back Conversando",
          description: "Consumo de API, loading, erros e cache com React Query.",
          difficulty: "intermediario",
          evolutionMoment: "🔗 As duas pontas agora falam a mesma língua.",
          lessons: [
            draftLesson({
              id: "fs-int-01-data",
              slug: "consumo-e-cache-de-dados",
              title: "Consumo e cache de dados",
              summary: "Estados de carregamento, erro e sincronização.",
            }),
          ],
        },
      ],
    },
    {
      id: "fs-p4",
      title: "Produção",
      description: "Testar de ponta a ponta, containerizar e publicar o sistema.",
      stages: [
        {
          id: "fs-s7",
          title: "Testes End-to-End",
          description: "Unitário, integração e E2E com Playwright.",
          difficulty: "avancado",
          lessons: [
            draftLesson({
              id: "fs-test-01-e2e",
              slug: "testes-e2e",
              title: "Testes E2E",
              summary: "Simular o usuário do clique ao resultado.",
            }),
          ],
        },
        {
          id: "fs-s8",
          title: "Docker e Deploy",
          description: "docker-compose multi-serviço, CI/CD e deploy de produção.",
          difficulty: "avancado",
          evolutionMoment:
            "🚀 VOCÊ CONSTRUIU SEU PRIMEIRO SISTEMA FULL-STACK — no ar, ponta a ponta.",
          lessons: [
            draftLesson({
              id: "fs-ops-01-deploy",
              slug: "deploy-multi-servico",
              title: "Deploy multi-serviço",
              summary: "Front, API e banco subindo juntos.",
            }),
          ],
        },
      ],
    },
  ],

  projects: [
    {
      id: "fs-proj-movies-full",
      title: "Catálogo de Filmes com Login",
      tagline: "Front e back seus, do zero",
      description:
        "React na frente, API Node atrás, banco com filmes e favoritos por usuário autenticado.",
      difficulty: "intermediario",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      skills: ["Integração front/back", "Autenticação", "Modelagem", "Deploy"],
      features: ["Cadastro/login", "Busca de filmes", "Favoritos por usuário", "Deploy completo"],
      unlockedAfterPhaseId: "fs-p3",
    },
    {
      id: "fs-proj-ecommerce",
      title: "E-commerce",
      tagline: "O projeto que prova que você consegue",
      description:
        "Catálogo, carrinho, checkout, painel administrativo e pedidos persistidos.",
      difficulty: "avancado",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe (sandbox)"],
      skills: ["Regras de negócio", "Estado complexo", "Pagamento", "Área administrativa"],
      features: ["Catálogo com filtros", "Carrinho persistente", "Checkout", "Admin de produtos e pedidos"],
      unlockedAfterPhaseId: "fs-p4",
    },
    {
      id: "fs-proj-saas",
      title: "Mini-SaaS",
      tagline: "O nível que você quer alcançar",
      description:
        "Aplicação multiusuário com planos, dashboard, cobrança recorrente e controle de acesso por função.",
      difficulty: "avancado",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
      skills: ["Multi-tenant", "Billing", "RBAC", "Observabilidade"],
      features: ["Onboarding de conta", "Planos e limites", "Dashboard por conta", "Papéis e permissões"],
      unlockedAfterPhaseId: "fs-p4",
    },
  ],
};
