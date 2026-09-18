import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import NetworkCanvas from "@/components/NetworkCanvas"; 
import HeroWordmark from "@/components/HeroWordmark";
import DotGrid from "@/components/DotGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Typewriter from "@/components/Typewriter";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  const professionalTitles = [
    "Data Scientist",
    "ML Engineer",
    "Data Systems Designer",
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero — asymmetric, left-aligned text with photo + motion art background on the right */}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-24">
          <div>
            <div className="mb-4 min-h-[28px]">
              <Typewriter words={professionalTitles} />
            </div>

            <h1 className="mb-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Building machine learning systems that solve real problems.
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted">
              I&apos;m Dagem Dereje. I design, train, and ship ML and data
              systems — from forecasting models to fraud detection to
              document AI — thinking carefully about the problem before
              reaching for a model.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-signal"
              >
                Explore my work
              </Link>
              <a
                href="mailto:dagem19dereje@gmail.com"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-signal"
              >
                Get in touch
              </a>
              <Link
                href="/resume.pdf"
                className="text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Download CV
              </Link>
            </div>
          </div>

          {/* Photo + Network Canvas Motion Art + Teal Glow Shadow + Wordmark */}
          <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
            <div className="absolute inset-0 -z-20 flex items-center justify-center overflow-visible">
              <HeroWordmark />
            </div>
            
            {/* Active particle network canvas background */}
            <div className="absolute -inset-12 -z-10 overflow-hidden rounded-2xl pointer-events-auto">
              <NetworkCanvas />
            </div>

            {/* Modern Teal Shadow Glow Light behind the image */}
            <div className="absolute -inset-3 -z-10 bg-[#3ecfb4] rounded-3xl blur-2xl opacity-60 pointer-events-none animate-pulse"></div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm relative z-10">
              <Image
                src="/photo.jpg"
                alt="Portrait of Dagem Dereje"
                width={480}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Featured projects */}
        <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-6 pb-8">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
            Featured projects
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Other projects */}
        {other.length > 0 && (
          <section className="relative overflow-hidden py-16">
            <DotGrid />
            <div className="relative mx-auto max-w-5xl px-6">
              <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
                More projects
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {other.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}