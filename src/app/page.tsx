import { CopyEmail } from "@/components/CopyEmail";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { AwardList, Timeline } from "@/components/Timeline";
import { StatusBadge, Tag } from "@/components/ui";
import { profile } from "@/data/profile";
import { otherProjects, projects } from "@/data/projects";

const linkLabels: Record<string, string> = { github: "GitHub", notion: "Notion", blog: "Blog" };

export default function Home() {
  const { contacts } = profile;
  const links = Object.entries(contacts).filter(([key, url]) => key !== "email" && url) as [string, string][];

  return (
    <>
      <Section
        endpoint="GET /me"
        data={{
          name: profile.name,
          nameEn: profile.nameEn,
          role: profile.role,
          tagline: profile.tagline,
          location: profile.location,
          openToWork: profile.openToWork,
        }}
      >
        <StatusBadge open={profile.openToWork} />
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {profile.name}
          <span className="ml-3 text-xl font-medium text-muted sm:text-2xl">{profile.nameEn}</span>
        </h1>
        <p className="mt-2 font-mono text-sm text-accent">{profile.role}</p>
        <p className="mt-6 max-w-xl text-xl leading-relaxed sm:text-2xl">{profile.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href="#projects"
            className="rounded-md bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-85"
          >
            프로젝트 보기
          </a>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className="rounded-md border border-border bg-surface px-4 py-2 font-medium transition-colors hover:border-accent"
            >
              이력서 다운로드
            </a>
          )}
          {contacts.github && (
            <a
              href={contacts.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border bg-surface px-4 py-2 font-medium transition-colors hover:border-accent"
            >
              GitHub
            </a>
          )}
        </div>
      </Section>

      <Section id="about" endpoint="GET /about" title="소개" data={{ about: profile.about }}>
        <div className="space-y-3 text-[17px] leading-relaxed">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="skills" endpoint="GET /skills" title="기술 스택" data={profile.skills}>
        <dl className="space-y-4">
          {profile.skills.map((g) => (
            <div key={g.category} className="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs leading-7 text-muted">{g.category}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="projects"
        endpoint="GET /projects"
        title="프로젝트"
        data={{
          main: projects.map(({ slug, title, summary, period, team, stack }) => ({ slug, title, summary, period, team, stack })),
          others: otherProjects,
        }}
      >
        <div className="space-y-5">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <h3 className="mt-12 text-sm font-semibold text-muted">그 외 프로젝트</h3>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {otherProjects.map((p) => (
            <li key={p.title} className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
              <p className="font-mono text-xs leading-6 text-muted">{p.period}</p>
              <div>
                <p className="leading-6">
                  <span className="font-semibold">{p.title}</span>
                  {p.link && (
                    <a href={p.link.url} target="_blank" rel="noreferrer" className="ml-2 text-sm text-accent underline-offset-4 hover:underline">
                      {p.link.label} ↗
                    </a>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-muted">{p.summary}</p>
                <p className="mt-1.5 font-mono text-xs text-muted">{p.stack.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="history"
        endpoint="GET /history"
        title="이력"
        data={{ timeline: profile.timeline, certifications: profile.certifications, awards: profile.awards }}
      >
        <Timeline items={profile.timeline} />
        <h3 className="mt-12 text-sm font-semibold text-muted">자격증</h3>
        <div className="mt-4">
          <AwardList items={profile.certifications} />
        </div>
        <h3 className="mt-12 text-sm font-semibold text-muted">수상</h3>
        <div className="mt-4">
          <AwardList items={profile.awards} />
        </div>
      </Section>

      <Section id="contact" endpoint="POST /contact" title="연락처" data={contacts}>
        <p className="text-[17px] leading-relaxed text-muted">
          채용이나 프로젝트에 관한 이야기라면 언제든 편하게 연락 주세요.
        </p>
        <div className="mt-6">
          <CopyEmail email={contacts.email} />
        </div>
        {links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-4 text-sm">
            {links.map(([key, url]) => (
              <li key={key}>
                <a href={url} target="_blank" rel="noreferrer" className="text-muted underline-offset-4 hover:text-foreground hover:underline">
                  {linkLabels[key] ?? key} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
