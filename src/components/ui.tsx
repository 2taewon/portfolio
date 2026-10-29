import type { ReactNode } from "react";
import type { Metric } from "@/data/projects";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function StatusBadge({ open }: { open: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs">
      <span className={`h-2 w-2 rounded-full ${open ? "bg-ok" : "bg-muted"}`} aria-hidden />
      {open ? "200 OK · 구직 중" : "204 · 재직 중"}
    </span>
  );
}

export function MetricValue({ metric, size = "md" }: { metric: Metric; size?: "md" | "lg" }) {
  return (
    <div>
      <p className="text-xs text-muted">{metric.label}</p>
      <p className={`mt-1 font-semibold tracking-tight ${size === "lg" ? "text-2xl" : "text-lg"}`}>
        {metric.before && (
          <>
            <span className="font-normal text-muted line-through decoration-1">{metric.before}</span>
            <span className="mx-1.5 text-muted">→</span>
          </>
        )}
        <span className="text-accent">{metric.after}</span>
      </p>
    </div>
  );
}

export function ArchitectureFlow({ nodes }: { nodes: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2 font-mono text-xs">
      {nodes.map((node, i) => (
        <li key={node} className="flex items-center">
          <span className="rounded-md border border-border bg-surface px-2.5 py-1.5">{node}</span>
          {i < nodes.length - 1 && (
            <span className="px-1.5 text-muted" aria-hidden>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
