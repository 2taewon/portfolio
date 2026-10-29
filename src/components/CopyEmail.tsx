"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href={`mailto:${email}`} className="text-lg font-semibold underline-offset-4 hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        {copied ? "copied ✓" : "copy"}
      </button>
    </div>
  );
}
