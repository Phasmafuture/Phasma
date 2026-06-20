import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "phasma_demo_runs";

export interface DemoRun {
  id: string;
  name: string;
  description: string;
  status: "running" | "completed";
  totalEpisodes: number;
  createdAt: string;
  modelType: "surgical" | "humanoid";
}

function loadRuns(): DemoRun[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DemoRun[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveRuns(runs: DemoRun[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
  } catch {
    // ignore storage errors
  }
}

export function useDemoRuns() {
  const [runs, setRuns] = useState<DemoRun[]>(loadRuns);

  useEffect(() => {
    saveRuns(runs);
  }, [runs]);

  const createRun = useCallback(
    (
      name: string,
      description: string,
      modelType: "surgical" | "humanoid" = "surgical",
    ) => {
      const newRun: DemoRun = {
        id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        name,
        description,
        status: "completed",
        totalEpisodes: 1000,
        createdAt: new Date().toISOString(),
        modelType,
      };
      setRuns((prev) => [newRun, ...prev]);
    },
    [],
  );

  return { runs, createRun };
}
