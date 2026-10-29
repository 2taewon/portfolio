import Link from "next/link";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import { ViewToggle } from "./ViewMode";

const nav = [
  { href: "/#about", label: "소개" },
  { href: "/#skills", label: "기술" },
  { href: "/#projects", label: "프로젝트" },
  { href: "/#history", label: "이력" },
  { href: "/#contact", label: "연락처" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-mono text-sm font-semibold">
          {profile.handle}
        </Link>
        <nav className="hidden gap-5 text-sm text-muted md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ViewToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
