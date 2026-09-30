"use client";

import { useEffect, useRef, useState } from "react";
import { Server, Boxes, Radar } from "lucide-react";
import RadialGauge, { STATUS_COLORS } from "./RadialGauge";
import type { HomelabMetricsResponse, HomelabStatus } from "@/types/homelab";

const POLL_INTERVAL_MS = 45_000;
const STALE_AFTER_MS = 120_000;

// Mirrors the scrape-health thresholds in src/lib/homelab-metrics.ts —
// presentation-only, drives the small health dot on the targets stat card.
function scrapeStatus(percent: number | null | undefined): HomelabStatus {
  if (percent === null || percent === undefined) return "unavailable";
  if (percent >= 100) return "healthy";
  if (percent >= 50) return "warning";
  return "critical";
}

const STATUS_LABEL: Record<HomelabStatus, string> = {
  healthy: "All systems normal",
  warning: "Degraded",
  critical: "Attention needed",
  stale: "Stale data",
  unavailable: "Unavailable",
};

function formatAgo(updatedAt: string | null, now: number): string {
  if (!updatedAt) return "never";
  const seconds = Math.max(0, Math.round((now - new Date(updatedAt).getTime()) / 1000));
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.round(seconds / 60)}m ago`;
}

export default function HomelabTelemetry() {
  const [data, setData] = useState<HomelabMetricsResponse | null>(null);
  const [lastSuccessAt, setLastSuccessAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const hasDataRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/homelab-metrics", { cache: "no-store" });
        const json: HomelabMetricsResponse = await res.json();
        if (cancelled) return;

        if (json.metrics) {
          hasDataRef.current = true;
          setData(json);
          setLastSuccessAt(Date.now());
        } else if (!hasDataRef.current) {
          // Never had good data — show the honest unavailable state.
          setData(json);
        }
        // Otherwise: this poll came back unavailable but we still have older
        // good data on screen. Leave it in place; the ticker below marks it stale.
      } catch {
        if (cancelled) return;
        if (!hasDataRef.current) setData({ status: "unavailable", updatedAt: null, metrics: null });
      }
    }

    poll();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") poll();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  const isLoading = data === null;
  const metrics = data?.metrics ?? null;
  const isStale = lastSuccessAt !== null && now - lastSuccessAt > STALE_AFTER_MS;

  const displayStatus: HomelabStatus = isLoading
    ? "unavailable"
    : !metrics
      ? "unavailable"
      : isStale
        ? "stale"
        : data!.status;

  const showGauges = metrics !== null;
  const isLive = !isLoading && displayStatus !== "stale" && displayStatus !== "unavailable";

  return (
    <div className="glass-container mt-8 w-full p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Server size={20} className="text-white/70" />
          <h3 className="text-lg font-semibold text-white">Live Homelab Telemetry</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span
            className={`h-2 w-2 rounded-full ${isLive ? "animate-pulse" : ""}`}
            style={{ backgroundColor: STATUS_COLORS[displayStatus] }}
            aria-hidden
          />
          <span>
            {isLoading ? "Connecting…" : `${STATUS_LABEL[displayStatus]} · ${formatAgo(data?.updatedAt ?? null, now)}`}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-wrap justify-center gap-8" aria-hidden>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[148px] w-[148px] animate-pulse rounded-full bg-white/[0.04]" />
          ))}
        </div>
      ) : !showGauges ? (
        <p className="text-sm text-white/50">
          Telemetry is currently unavailable. Check back shortly.
        </p>
      ) : (
        <div
          className={`flex flex-col gap-6 transition-opacity duration-500 md:flex-row md:items-stretch md:gap-8 ${
            isStale ? "opacity-50" : ""
          }`}
        >
          <div className="grid flex-1 grid-cols-3 place-items-center gap-4">
            <RadialGauge label="CPU" value={metrics.cpuPercent} />
            <RadialGauge label="Memory" value={metrics.memoryPercent} />
            <RadialGauge label="Disk" value={metrics.diskPercent} />
          </div>

          <div className="flex gap-4 md:w-64 md:flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6">
              <Boxes size={20} className="text-white/60" />
              <span className="text-2xl font-bold text-white">
                {metrics.runningContainers ?? "—"}
              </span>
              <span className="text-xs text-white/50">Running Containers</span>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6">
              <Radar size={20} className="text-white/60" />
              <span className="text-2xl font-bold text-white">
                {metrics.healthyTargets ?? "—"} / {metrics.configuredTargets ?? "—"}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/50">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[scrapeStatus(metrics.scrapeHealthPercent)] }}
                  aria-hidden
                />
                Scrape Targets Healthy
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
