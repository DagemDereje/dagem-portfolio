import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DotGrid from "@/components/DotGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, education, and skills of Dagem Dereje — a Data Scientist specializing in Machine Learning, AI, and data-driven solutions.",
};

const skillGroups = [
  {
    title: "Data Science",
    items: ["Python", "Pandas", "NumPy", "Scikit-learn", "EDA", "Feature Engineering", "Model Evaluation"],
  },
  {
    title: "Machine Learning",
    items: ["Regression", "Classification", "Clustering", "Random Forest", "XGBoost", "K-Means"],
  },
  {
    title: "Deep Learning / AI",
    items: ["PyTorch", "Transformers", "LayoutLMv3", "Computer Vision (OCR)"],
  },
  {
    title: "Data & BI",
    items: ["SQL", "Dashboards", "Customer Analytics", "Data Visualization", "Plotly"],
  },
  {
    title: "Application & Deployment",
    items: ["Streamlit", "FastAPI", "Docker", "REST APIs"],
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="relative mx-auto max-w-3xl px-6 py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 overflow-hidden">
          <DotGrid />
        </div>
        <h1 className="mb-6 font-display text-3xl font-semibold text-ink">About</h1>

        <div className="mb-12 space-y-4 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m a 2026 Data Science graduate, early in my career but
            serious about it: I build things, think carefully about
            problems before reaching for a model, and want to create
            real-world impact with Machine Learning, AI, and data analysis.
          </p>
          <p>
            What draws me to this field is the combination of rigor and
            creativity — the same problem can be approached a dozen
            different ways, and figuring out which approach actually fits
            the data and the real-world constraint is the interesting part.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">
            Background
          </h2>
          <ul className="space-y-2.5 text-muted">
            <li className="flex gap-3">
              <span className="text-signal">—</span>BSc in Data Science, Bahir Dar University
            </li>
            <li className="flex gap-3">
              <span className="text-signal">—</span>CGPA: 3.52 / 4.00
            </li>
            <li className="flex gap-3">
              <span className="text-signal">—</span>National Exit Exam: 84 / 100
            </li>
            <li className="flex gap-3">
              <span className="text-signal">—</span>Internship, Information Network Security Administration (INSA)
            </li>
            <li className="flex gap-3">
              <span className="text-signal">—</span>Best Senior Project Award
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 font-display text-xl font-semibold text-ink">
            Skills
          </h2>
          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-2.5 font-mono text-sm text-signal">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-sm text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            These are technologies and areas I&apos;ve worked with and
            continue to develop — not a claim of mastery over all of them.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
