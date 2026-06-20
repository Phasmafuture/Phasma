import { useCallback, useState } from "react";
import { WorkspacePlan } from "../types/workspacePlan";

const STORAGE_KEY = "phasma_workspace_plan";

function getStoredPlan(): WorkspacePlan {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached === WorkspacePlan.pro || cached === WorkspacePlan.free) {
      return cached;
    }
  } catch {
    // ignore
  }
  return WorkspacePlan.free;
}

function setStoredPlan(plan: WorkspacePlan) {
  try {
    localStorage.setItem(STORAGE_KEY, plan);
  } catch {
    // ignore
  }
}

export function useWorkspacePlan() {
  const [plan, setPlan] = useState<WorkspacePlan>(getStoredPlan);

  const selectPlan = useCallback((newPlan: WorkspacePlan) => {
    setPlan(newPlan);
    setStoredPlan(newPlan);
  }, []);

  const isPro = plan === WorkspacePlan.pro;
  const isFree = plan === WorkspacePlan.free;

  return {
    plan,
    isPro,
    isFree,
    isLoading: false,
    isFetched: true,
    selectPlan,
    isSelecting: false,
  };
}
