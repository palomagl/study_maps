/**
 * Layout do Mapa da Trilha.
 *
 * Diferente de um roadmap desenhado à mão, aqui a posição de cada nó é
 * **derivada da própria estrutura de conteúdo**: uma aula nova em
 * `content/trails/*` aparece no mapa sozinha, sem ninguém mexer em coordenada.
 *
 * Geometria: um trilho vertical no centro; as etapas penduram alternando
 * esquerda/direita; as aulas de cada etapa descem logo abaixo dela, do mesmo
 * lado. As fases são portais centrados que cortam o trilho.
 *
 * Puro de propósito — não conhece React nem progresso. O estado visual de cada
 * nó é calculado na renderização, o que mantém este módulo trivial de testar.
 */
import type { Lesson, Phase, Stage, Trail } from "@/content/types";

/* ------------------------------------------------------------------ */
/* Geometria                                                          */
/* ------------------------------------------------------------------ */

export const MAP = {
  width: 940,
  /** x do trilho central. */
  spineX: 470,

  phaseW: 360,
  phaseH: 76,

  stageW: 280,
  stageH: 76,

  lessonW: 244,
  lessonH: 48,

  /** Espaço entre o trilho e a borda interna da caixa de etapa. */
  spineGap: 44,
  /** Recuo das aulas em relação à caixa da etapa. */
  lessonIndent: 30,

  /** Espaços verticais. */
  padTop: 24,
  padBottom: 56,
  gapAfterPhase: 40,
  gapStageToLessons: 14,
  gapBetweenLessons: 10,
  gapAfterGroup: 40,
} as const;

/* ------------------------------------------------------------------ */
/* Nós                                                                */
/* ------------------------------------------------------------------ */

export type MapSide = "left" | "right";

interface NodeBox {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PhaseNode extends NodeBox {
  kind: "phase";
  phase: Phase;
  /** 1-based, para rotular "Fase 2". */
  order: number;
}

export interface StageNode extends NodeBox {
  kind: "stage";
  stage: Stage;
  phaseId: string;
  side: MapSide;
  /** 1-based dentro da trilha inteira. */
  order: number;
}

export interface LessonNode extends NodeBox {
  kind: "lesson";
  lesson: Lesson;
  stageId: string;
  phaseId: string;
  side: MapSide;
}

export type MapNode = PhaseNode | StageNode | LessonNode;

/** Aresta desenhada em SVG. `ownerId` diz de qual nó ela depende para "acender". */
export interface MapEdge {
  id: string;
  kind: "spine" | "branch" | "twig";
  d: string;
  /** Nó cuja conclusão acende a aresta. */
  ownerId: string;
}

export interface TrailMapLayout {
  nodes: MapNode[];
  edges: MapEdge[];
  width: number;
  height: number;
}

/* ------------------------------------------------------------------ */
/* Construção                                                         */
/* ------------------------------------------------------------------ */

/** Borda da caixa de etapa/aula voltada para o trilho. */
function boxX(side: MapSide, w: number, indent = 0): number {
  return side === "right"
    ? MAP.spineX + MAP.spineGap + indent
    : MAP.spineX - MAP.spineGap - indent - w;
}

/** Curva do trilho até a caixa da etapa — desce e abre para o lado. */
function branchPath(side: MapSide, stage: StageNode): string {
  const from = { x: MAP.spineX, y: stage.y + 8 };
  const to = {
    x: side === "right" ? stage.x : stage.x + stage.w,
    y: stage.y + stage.h / 2,
  };
  const dx = to.x - from.x;
  return `M ${from.x} ${from.y} C ${from.x + dx * 0.55} ${from.y}, ${to.x - dx * 0.45} ${to.y}, ${to.x} ${to.y}`;
}

/**
 * Monta o mapa inteiro de uma trilha.
 * As etapas alternam de lado na ordem em que aparecem na trilha (não por fase),
 * então o zigue-zague nunca "repete lado" ao virar a página de uma fase.
 */
export function buildTrailMap(trail: Trail): TrailMapLayout {
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];

  /** Pontos onde o trilho é ancorado, na ordem vertical. */
  const spineAnchors: { y: number; ownerId: string }[] = [];

  let y = MAP.padTop;
  let stageOrder = 0;

  trail.phases.forEach((phase, phaseIndex) => {
    const phaseNode: PhaseNode = {
      kind: "phase",
      id: phase.id,
      phase,
      order: phaseIndex + 1,
      x: MAP.spineX - MAP.phaseW / 2,
      y,
      w: MAP.phaseW,
      h: MAP.phaseH,
    };
    nodes.push(phaseNode);
    spineAnchors.push({ y: y + MAP.phaseH, ownerId: phase.id });
    y += MAP.phaseH + MAP.gapAfterPhase;

    phase.stages.forEach((stage) => {
      const side: MapSide = stageOrder % 2 === 0 ? "right" : "left";
      stageOrder += 1;

      const stageNode: StageNode = {
        kind: "stage",
        id: stage.id,
        stage,
        phaseId: phase.id,
        side,
        order: stageOrder,
        x: boxX(side, MAP.stageW),
        y,
        w: MAP.stageW,
        h: MAP.stageH,
      };
      nodes.push(stageNode);
      edges.push({
        id: `branch-${stage.id}`,
        kind: "branch",
        d: branchPath(side, stageNode),
        ownerId: stage.id,
      });
      spineAnchors.push({ y: y + 8, ownerId: stage.id });

      // Aulas descem sob a etapa, presas a um trilho curto vertical.
      const lessonX = boxX(side, MAP.lessonW, MAP.lessonIndent);
      const railX =
        side === "right"
          ? stageNode.x + 16
          : stageNode.x + stageNode.w - 16;

      let ly = y + MAP.stageH + MAP.gapStageToLessons;
      const lessonNodes: LessonNode[] = stage.lessons.map((lesson) => {
        const node: LessonNode = {
          kind: "lesson",
          id: lesson.id,
          lesson,
          stageId: stage.id,
          phaseId: phase.id,
          side,
          x: lessonX,
          y: ly,
          w: MAP.lessonW,
          h: MAP.lessonH,
        };
        ly += MAP.lessonH + MAP.gapBetweenLessons;
        return node;
      });

      if (lessonNodes.length > 0) {
        const last = lessonNodes[lessonNodes.length - 1];
        edges.push({
          id: `rail-${stage.id}`,
          kind: "twig",
          d: `M ${railX} ${y + MAP.stageH} L ${railX} ${last.y + last.h / 2}`,
          ownerId: stage.id,
        });
        for (const node of lessonNodes) {
          const endX = side === "right" ? node.x : node.x + node.w;
          edges.push({
            id: `twig-${node.id}`,
            kind: "twig",
            d: `M ${railX} ${node.y + node.h / 2} L ${endX} ${node.y + node.h / 2}`,
            ownerId: node.id,
          });
          nodes.push(node);
        }
        y = last.y + last.h + MAP.gapAfterGroup;
      } else {
        y += MAP.stageH + MAP.gapAfterGroup;
      }
    });
  });

  // Trilho central: um segmento entre âncoras consecutivas. Cada segmento
  // acende junto com o nó imediatamente acima dele.
  for (let i = 0; i < spineAnchors.length - 1; i++) {
    const a = spineAnchors[i];
    const b = spineAnchors[i + 1];
    edges.push({
      id: `spine-${i}`,
      kind: "spine",
      d: `M ${MAP.spineX} ${a.y} L ${MAP.spineX} ${b.y}`,
      ownerId: a.ownerId,
    });
  }

  return {
    nodes,
    edges,
    width: MAP.width,
    height: y - MAP.gapAfterGroup + MAP.padBottom,
  };
}
