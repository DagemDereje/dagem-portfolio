import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/projects";
import LiveAppEmbed from "@/components/LiveAppEmbed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectIllustration, { IllustrationVariant } from "@/components/illustrations/ProjectIllustration";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  const url = `${SITE_URL}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.oneLiner,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.oneLiner,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.oneLiner,
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.oneLiner,
    url: `${SITE_URL}/projects/${project.slug}`,
    codeRepository: project.githubUrl,
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    keywords: project.techStack.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/#projects"
          className="mb-8 inline-block text-sm font-medium text-muted hover:text-ink"
        >
          ← All projects
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          <span className="text-sm text-muted">{project.category}</span>
        </div>
        <h1 className="mb-4 font-display text-3xl font-semibold text-ink">{project.title}</h1>
        <p className="mb-6 text-lg leading-relaxed text-muted">{project.oneLiner}</p>

        <div className="mb-8 overflow-hidden rounded-xl border border-border bg-surface">
          <ProjectIllustration
            variant={project.slug as IllustrationVariant}
            className="h-40 w-full px-8 py-4"
          />
        </div>

        {project.metricHighlight && (
          <div className="mb-8 inline-flex items-baseline gap-2 rounded-lg border border-border bg-surface px-4 py-2.5">
            <span className="font-mono text-xl font-medium text-amber">
              {project.metricHighlight.value}
            </span>
            <span className="text-sm text-muted">{project.metricHighlight.label}</span>
          </div>
        )}

        <div className="mb-10 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <Section title="Problem">
          <p className="leading-relaxed text-muted">{project.problem}</p>
        </Section>

        <Section title="Data">
          <p className="leading-relaxed text-muted">{project.data}</p>
        </Section>

        <Section title="Methodology">
          <ul className="space-y-2.5 text-muted">
            {project.methodology.map((step, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="text-signal">—</span>
                {step}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Results">
          <p className="leading-relaxed text-muted">{project.results}</p>
        </Section>

        <Section title="Limitations">
          <ul className="space-y-2.5 text-muted">
            {project.limitations.map((lim, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="text-signal">—</span>
                {lim}
              </li>
            ))}
          </ul>
        </Section>

        {project.liveAppUrl && (
          <Section title="Interactive application">
            <LiveAppEmbed
              appUrl={project.liveAppUrl}
              appName={project.title}
              description={project.appDescription ?? project.oneLiner}
              previewImageSrc={project.previewImageSrc}
              height={800}
            />
          </Section>
        )}

        <Section title="Source code">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-signal"
          >
            View on GitHub ↗
          </a>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-display text-xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}
