import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { ViewModeProvider } from "@/components/ViewMode";
import { profile } from "@/data/profile";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.tagline,
    type: "website",
    locale: "ko_KR",
  },
};

// 첫 페인트 전에 저장된 테마(또는 OS 설정)를 적용해 깜빡임을 막습니다.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen">
        <ViewModeProvider>
          <Header />
          <main className="mx-auto max-w-3xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20">{children}</main>
          <footer className="border-t border-border">
            <p className="mx-auto max-w-3xl px-4 py-6 font-mono text-xs text-muted sm:px-6">
              © {profile.name} · Built with Next.js
            </p>
          </footer>
        </ViewModeProvider>
      </body>
    </html>
  );
}
