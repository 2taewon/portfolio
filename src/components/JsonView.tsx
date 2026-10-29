import type { ReactNode } from "react";

// JSON.stringify 결과를 토큰 단위로 나눠 색을 입힙니다. 외부 라이브러리 없이 동작합니다.
const TOKEN = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;

function highlight(json: string) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of json.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(json.slice(last, i));
    const [whole, str, colon, literal, num] = m;
    if (str && colon) {
      parts.push(
        <span key={i} style={{ color: "var(--json-key)" }}>
          {str}
        </span>,
        colon,
      );
    } else if (str) {
      parts.push(
        <span key={i} style={{ color: "var(--json-string)" }}>
          {str}
        </span>,
      );
    } else if (literal) {
      parts.push(
        <span key={i} style={{ color: "var(--json-literal)" }}>
          {literal}
        </span>,
      );
    } else if (num) {
      parts.push(
        <span key={i} style={{ color: "var(--json-number)" }}>
          {num}
        </span>,
      );
    } else {
      parts.push(whole);
    }
    last = i + whole.length;
  }
  parts.push(json.slice(last));
  return parts;
}

export function JsonView({ data, status = "200 OK" }: { data: unknown; status?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-code-bg font-mono text-[13px] leading-relaxed">
      <div className="flex items-center gap-3 border-b border-border px-4 py-2 text-xs text-muted">
        <span className="font-semibold text-ok">{status}</span>
        <span>application/json</span>
      </div>
      <pre className="overflow-x-auto p-4 whitespace-pre-wrap break-words">
        <code>{highlight(JSON.stringify(data, null, 2))}</code>
      </pre>
    </div>
  );
}
