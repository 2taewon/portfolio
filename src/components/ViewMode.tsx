"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ViewMode = "human" | "json";

const ViewModeContext = createContext<{
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}>({ mode: "human", setMode: () => {} });

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("human");
  return <ViewModeContext.Provider value={{ mode, setMode }}>{children}</ViewModeContext.Provider>;
}

export function useViewMode() {
  return useContext(ViewModeContext);
}

export function ViewToggle() {
  const { mode, setMode } = useViewMode();
  const options: { value: ViewMode; label: string }[] = [
    { value: "human", label: "Human" },
    { value: "json", label: "JSON" },
  ];

  return (
    <div
      role="group"
      aria-label="보기 방식"
      title="같은 내용을 API 응답(JSON) 형태로 볼 수 있어요"
      className="flex rounded-md border border-border bg-surface p-0.5 font-mono text-xs"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={mode === o.value}
          onClick={() => setMode(o.value)}
          className={`rounded px-2.5 py-1 transition-colors ${
            mode === o.value ? "bg-accent text-surface" : "text-muted hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
