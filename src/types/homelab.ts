export type HomelabStatus = "healthy" | "warning" | "critical" | "stale" | "unavailable";

export type HomelabMetrics = {
  cpuPercent: number | null;
  memoryPercent: number | null;
  diskPercent: number | null;
  runningContainers: number | null;
  healthyTargets: number | null;
  configuredTargets: number | null;
  scrapeHealthPercent: number | null;
};

export type HomelabMetricsResponse = {
  status: HomelabStatus;
  updatedAt: string | null;
  metrics: HomelabMetrics | null;
};
