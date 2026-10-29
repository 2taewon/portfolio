import Link from "next/link";
import type { Project } from "@/data/projects";
import { MetricValue, Tag } from "./ui";

const MAX_TAGS = 6;

export function ProjectCard({ project }: { project: Project }) {
  const extra = project.stack.length - MAX_TAGS;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
        <span className="font-mono text-xs text-muted">
          {project.period} · {project.team}
        </span>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.summary}</p>

      <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <dt className="text-xs text-muted">담당</dt>
          <dd className="mt-1 text-[15px] font-semibold">{project.myWork.map((w) => w.title).join(" · ")}</dd>
        </div>
        {project.metrics?.map((m) => (
          <MetricValue key={m.label} metric={m} />
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, MAX_TAGS).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {extra > 0 && <Tag>+{extra}</Tag>}
        </div>
        <span className="text-sm font-medium text-accent">
          자세히 보기 <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
