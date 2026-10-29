import type { Award, TimelineItem } from "@/data/profile";

// 이력을 로그 한 줄처럼 보여줍니다: [기간] EDU 기관 · 내용
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-7">
      {items.map((e) => (
        <li key={`${e.title}-${e.start}`} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
          <p className="font-mono text-xs leading-6 text-muted">
            {e.start}
            {e.end && ` – ${e.end}`}
          </p>
          <div>
            <p className="leading-6">
              <span className="mr-2 inline-block w-12 font-mono text-xs font-semibold text-ok">{e.kind}</span>
              <span className="font-semibold">{e.title}</span>
            </p>
            <p className="pl-14 text-sm text-muted">{e.subtitle}</p>
            {e.highlights && (
              <ul className="mt-2 space-y-1.5 pl-14 text-[15px]">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      –
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AwardList({ items }: { items: Award[] }) {
  return (
    <ul className="space-y-3">
      {items.map((a) => (
        <li key={a.title} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
          <p className="font-mono text-xs leading-6 text-muted">{a.date ?? "—"}</p>
          <p className="leading-6">
            <span className="font-semibold">{a.title}</span>
            {a.note && <span className="text-muted"> · {a.note}</span>}
          </p>
        </li>
      ))}
    </ul>
  );
}
