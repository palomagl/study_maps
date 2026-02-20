import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "studymaps-progress";

interface ProgressData {
  completedCheckpoints: Record<string, string[]>; // nodeId -> checkpointTexts
  completedNodes: Record<string, string[]>; // trailId -> nodeIds
}

const loadProgress = (): ProgressData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedCheckpoints: {}, completedNodes: {} };
};

const saveProgress = (data: ProgressData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export function useProgress(trailId: string) {
  const [data, setData] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    saveProgress(data);
  }, [data]);

  const isCheckpointDone = useCallback(
    (nodeId: string, checkpoint: string) =>
      data.completedCheckpoints[nodeId]?.includes(checkpoint) ?? false,
    [data]
  );

  const toggleCheckpoint = useCallback(
    (nodeId: string, checkpoint: string) => {
      setData((prev) => {
        const copy = { ...prev, completedCheckpoints: { ...prev.completedCheckpoints } };
        const list = [...(copy.completedCheckpoints[nodeId] ?? [])];
        const idx = list.indexOf(checkpoint);
        if (idx >= 0) list.splice(idx, 1);
        else list.push(checkpoint);
        copy.completedCheckpoints[nodeId] = list;
        return copy;
      });
    },
    []
  );

  const isNodeDone = useCallback(
    (nodeId: string) => data.completedNodes[trailId]?.includes(nodeId) ?? false,
    [data, trailId]
  );

  const toggleNode = useCallback(
    (nodeId: string) => {
      setData((prev) => {
        const copy = { ...prev, completedNodes: { ...prev.completedNodes } };
        const list = [...(copy.completedNodes[trailId] ?? [])];
        const idx = list.indexOf(nodeId);
        if (idx >= 0) list.splice(idx, 1);
        else list.push(nodeId);
        copy.completedNodes[trailId] = list;
        return copy;
      });
    },
    [trailId]
  );

  const getTrailProgress = useCallback(
    (totalNodes: number) => {
      const done = data.completedNodes[trailId]?.length ?? 0;
      return totalNodes > 0 ? Math.round((done / totalNodes) * 100) : 0;
    },
    [data, trailId]
  );

  return { isCheckpointDone, toggleCheckpoint, isNodeDone, toggleNode, getTrailProgress };
}
