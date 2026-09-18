import Link from "next/link";
import type { Project } from "@/lib/projects";
import ProjectIllustration, { IllustrationVariant } from "./illustrations/ProjectIllustration";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition hover:border-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
    >
      <div className="border-b border-border bg-paper/50 px-6 pt-5">
        <ProjectIllustration
          variant={project.slug as IllustrationVariant}
          className="h-20 w-full"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          <span className="text-sm text-muted">{project.category}</span>
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold text-ink group-hover:text-signal">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.oneLiner}</p>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.metricHighlight && (
          <div className="text-right">
            <p className="font-mono text-lg font-medium text-amber">
              {project.metricHighlight.value}
            </p>
            <p className="text-xs text-muted">{project.metricHighlight.label}</p>
          </div>
        )}
      </div>
      </div>
    </Link>
  );
}
