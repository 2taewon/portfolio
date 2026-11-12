import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { ArchitectureFlow, MetricValue, Tag } from "@/components/ui";
import { profile } from "@/data/profile";
import { getProject, projects, type Troubleshooting } from "@/data/projects";

// 프로젝트 페이지는 generateStaticParams로 빌드 때 모두 만들어 두므로, 개발 서버의 "즉시 이동" 검사에서 뺀다.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${profile.name}`,
    description: project.summary,
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-border py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <h2 className="font-mono text-xs leading-7 font-semibold text-muted">{title}</h2>
      <div className="min-w-0 text-[16px] leading-relaxed">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-accent" aria-hidden>
            –
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function TroubleshootingCase({ index, item }: { index: number; item: Troubleshooting }) {
  const rows: [string, ReactNode][] = [
    ["문제", <p key="p">{item.problem}</p>],
    ...(item.cause ? [["원인", <p key="c">{item.cause}</p>] as [string, ReactNode]] : []),
    ["해결", <List key="s" items={item.solution} />],
  ];

  // 제목과 결과만 먼저 보여 주고, 문제 · 원인 · 해결은 눌러서 펼친다.
  return (
    <details className="group rounded-xl border border-border bg-surface transition-colors hover:border-accent/60">
      <summary className="flex cursor-pointer list-none items-start gap-3 rounded-xl p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold tracking-tight">
            <span className="mr-2 font-mono text-sm text-accent">#{index + 1}</span>
            {item.title}
          </h3>
          {item.result && <p className="mt-1.5 text-[15px] leading-relaxed text-muted">→ {item.result}</p>}
        </div>
        <span
          className="mt-0.5 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden
        >
          ▾
        </span>
      </summary>
      <dl className="space-y-4 border-t border-border px-5 pt-4 pb-5 sm:px-6 sm:pb-6">
        {rows.map(([label, body]) => (
          <div key={label} className="grid gap-1 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-muted">{label}</dt>
            <dd className="text-[15px] leading-relaxed">{body}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Link href="/#projects" className="text-sm text-muted transition-colors hover:text-foreground">
        ← 프로젝트 목록
      </Link>

      <div className="mt-8">
        <Section endpoint={`GET /projects/${project.slug}`} data={project}>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <dt className="inline text-muted">기간 </dt>
              <dd className="inline">{project.period}</dd>
            </div>
            <div>
              <dt className="inline text-muted">팀 </dt>
              <dd className="inline">{project.team}</dd>
            </div>
            <div>
              <dt className="inline text-muted">대상 </dt>
              <dd className="inline">{project.target}</dd>
            </div>
          </dl>

          {project.image && (
            <div className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-xl border border-border">
              <Image
                src={project.image}
                alt={`${project.title} 화면`}
                fill
                preload
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover object-top"
              />
            </div>
          )}

          {project.metrics && (
            <div className="mt-8 grid grid-cols-1 gap-5 rounded-xl border border-border bg-surface p-6 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <MetricValue key={m.label} metric={m} size="lg" />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Block title="개요">
              <p>{project.overview}</p>
            </Block>
            <Block title="담당 기능">
              <div className="space-y-4">
                {project.myWork.map((w) => (
                  <div key={w.title}>
                    <p className="font-semibold">{w.title}</p>
                    <div className="mt-1.5">
                      <List items={w.details} />
                    </div>
                  </div>
                ))}
              </div>
            </Block>
            <Block title="서비스 기능">
              <List items={project.features} />
            </Block>
            <Block title="Stack">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </Block>
            {project.architectureImage ? (
              <Block title="Architecture">
                <a href={project.architectureImage} target="_blank" rel="noreferrer">
                  <Image
                    src={project.architectureImage}
                    alt={`${project.title} 아키텍처`}
                    width={1600}
                    height={900}
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="h-auto w-full rounded-xl border border-border bg-white"
                  />
                </a>
              </Block>
            ) : (
              project.architecture && (
                <Block title="Architecture">
                  <ArchitectureFlow nodes={project.architecture} />
                </Block>
              )
            )}
            {project.troubleshooting && (
              <Block title="트러블슈팅">
                <div className="space-y-4">
                  {project.troubleshooting.map((t, i) => (
                    <TroubleshootingCase key={t.title} index={i} item={t} />
                  ))}
                </div>
              </Block>
            )}
            {project.operation && (
              <Block title="운영 결과">
                <p className="text-sm text-muted">{project.operation.period}</p>
                <div className="mt-4 grid grid-cols-2 gap-5 rounded-xl border border-border bg-surface p-5 sm:grid-cols-4 sm:p-6">
                  {project.operation.metrics.map((m) => (
                    <MetricValue key={m.label} metric={m} />
                  ))}
                </div>
                {project.operation.image && (
                  <a href={project.operation.image} target="_blank" rel="noreferrer" className="mt-5 block">
                    <Image
                      src={project.operation.image}
                      alt={`${project.title} 운영 기간 Grafana 대시보드`}
                      width={project.operation.imageSize?.width ?? 1600}
                      height={project.operation.imageSize?.height ?? 1200}
                      sizes="(min-width: 768px) 720px, 100vw"
                      className="h-auto w-full rounded-xl border border-border"
                    />
                  </a>
                )}
                <div className="mt-5">
                  <List items={project.operation.notes} />
                </div>
              </Block>
            )}
            {project.learnings && (
              <Block title="배운 점">
                <p>{project.learnings}</p>
              </Block>
            )}
            {project.links && (
              <Block title="Links">
                <div className="flex flex-wrap gap-4 text-sm">
                  {project.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </Block>
            )}
          </div>
        </Section>
      </div>
    </>
  );
}
