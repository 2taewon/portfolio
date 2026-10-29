"use client";

import type { ReactNode } from "react";
import { JsonView } from "./JsonView";
import { useViewMode } from "./ViewMode";

export function EndpointLabel({ endpoint }: { endpoint: string }) {
  const [method, ...rest] = endpoint.split(" ");
  return (
    <p className="font-mono text-xs tracking-wide text-muted">
      <span className="mr-2 font-semibold text-accent">{method}</span>
      {rest.join(" ")}
    </p>
  );
}

// Human 모드에서는 children을, JSON 모드에서는 같은 data를 API 응답 형태로 보여줍니다.
export function Section({
  id,
  endpoint,
  title,
  data,
  children,
}: {
  id?: string;
  endpoint: string;
  title?: string;
  data: unknown;
  children: ReactNode;
}) {
  const { mode } = useViewMode();

  return (
    <section id={id} className="fade-up py-14 first:pt-0">
      <EndpointLabel endpoint={endpoint} />
      {title && <h2 className="mt-2 text-2xl font-bold tracking-tight">{title}</h2>}
      <div className={title ? "mt-6" : "mt-3"}>
        {mode === "json" ? <JsonView data={data} /> : children}
      </div>
    </section>
  );
}
