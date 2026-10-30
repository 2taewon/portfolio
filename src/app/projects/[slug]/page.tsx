import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { ArchitectureFlow, MetricValue, Tag } from "@/components/ui";
import { profile } from "@/data/profile";
import { getProject, projects, type Troubleshooting } from "@/data/projects";

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
    ...(item.result ? [["결과", <p key="r" className="font-semibold">{item.result}</p>] as [string, ReactNode]] : []),
  ];

  return (
    <article className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <h3 className="font-bold tracking-tight">
        <span className="mr-2 font-mono text-sm text-accent">#{index + 1}</span>
        {item.title}
      </h3>
      <dl className="mt-4 space-y-4">
        {rows.map(([label, body]) => (
          <div key={label} className="grid gap-1 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-muted">{label}</dt>
            <dd className="text-[15px] leading-relaxed">{body}</dd>
          </div>
        ))}
      </dl>
    </article>
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
