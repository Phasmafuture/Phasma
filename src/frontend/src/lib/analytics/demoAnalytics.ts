import type { DemoRun } from "../demoRuns";
import { generateDemoSeries } from "../metrics/generateDemoSeries";

export interface ProjectUsageSummary {
  totalRuns: number;
  completedRuns: number;
  runningRuns: number;
  totalEpisodes: number;
  recentActivity: {
    runName: string;
    createdAt: string;
  }[];
}

export function computeProjectUsage(runs: DemoRun[]): ProjectUsageSummary {
  const totalRuns = runs.length;
  const completedRuns = runs.filter((r) => r.status === "completed").length;
  const runningRuns = runs.filter((r) => r.status === "running").length;
  const totalEpisodes = runs.reduce((sum, r) => sum + r.totalEpisodes, 0);

  const recentActivity = runs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5)
    .map((r) => ({
      runName: r.name,
      createdAt: r.createdAt,
    }));

  return {
    totalRuns,
    completedRuns,
    runningRuns,
    totalEpisodes,
    recentActivity,
  };
}

export interface RunCompletionBreakdown {
  completed: number;
  running: number;
}

export function computeRunCompletionBreakdown(
  runs: DemoRun[],
): RunCompletionBreakdown {
  return {
    completed: runs.filter((r) => r.status === "completed").length,
    running: runs.filter((r) => r.status === "running").length,
  };
}

export interface HistogramBin {
  min: number;
  max: number;
  rewardCount: number;
  lossCount: number;
}

export interface HistogramData {
  bins: HistogramBin[];
  rewardStats: { mean: number; median: number; max: number };
  lossStats: { mean: number; median: number; max: number };
}

function computeMedian(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return 0;
  if (n % 2 === 1) return sorted[Math.floor(n / 2)];
  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

export function computeHistogramData(
  runs: DemoRun[],
  binCount = 10,
): HistogramData {
  // Generate real metric series for each run and aggregate per-episode values
  const allRewards: number[] = [];
  const allLosses: number[] = [];

  for (const run of runs) {
    const series = generateDemoSeries(run.totalEpisodes);
    allRewards.push(...series.reward);
    allLosses.push(...series.loss);
  }

  if (allRewards.length === 0 || allLosses.length === 0) {
    const emptyBins: HistogramBin[] = Array.from(
      { length: binCount },
      (_, i) => ({
        min: i,
        max: i + 1,
        rewardCount: 0,
        lossCount: 0,
      }),
    );
    return {
      bins: emptyBins,
      rewardStats: { mean: 0, median: 0, max: 0 },
      lossStats: { mean: 0, median: 0, max: 0 },
    };
  }

  const rewardMin = Math.min(...allRewards);
  const rewardMax = Math.max(...allRewards);
  const lossMin = Math.min(...allLosses);
  const lossMax = Math.max(...allLosses);

  const globalMin = Math.min(rewardMin, lossMin);
  const globalMax = Math.max(rewardMax, lossMax);
  const range = globalMax - globalMin || 1;
  const binSize = range / binCount;

  const bins: HistogramBin[] = Array.from({ length: binCount }, (_, i) => ({
    min: globalMin + i * binSize,
    max: globalMin + (i + 1) * binSize,
    rewardCount: 0,
    lossCount: 0,
  }));

  for (const value of allRewards) {
    const idx = Math.min(
      Math.floor((value - globalMin) / binSize),
      binCount - 1,
    );
    bins[idx].rewardCount++;
  }

  for (const value of allLosses) {
    const idx = Math.min(
      Math.floor((value - globalMin) / binSize),
      binCount - 1,
    );
    bins[idx].lossCount++;
  }

  const sortedRewards = [...allRewards].sort((a, b) => a - b);
  const sortedLosses = [...allLosses].sort((a, b) => a - b);

  const rewardMean =
    allRewards.reduce((sum, v) => sum + v, 0) / allRewards.length;
  const lossMean = allLosses.reduce((sum, v) => sum + v, 0) / allLosses.length;

  return {
    bins,
    rewardStats: {
      mean: rewardMean,
      median: computeMedian(sortedRewards),
      max: rewardMax,
    },
    lossStats: {
      mean: lossMean,
      median: computeMedian(sortedLosses),
      max: lossMax,
    },
  };
}
