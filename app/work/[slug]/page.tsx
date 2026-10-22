import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work, isTodo } from "@/lib/content";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { MaybeTodo, Placeholder } from "@/components/placeholder";
import { RegMarks } from "@/components/annotation";
import { PipelineDiagram } from "@/components/diagram/pipeline";
import { ThemeSwapDemo } from "@/components/demo/theme-swap";

/** Next 15+ hands dynamic params over as a promise. */
type Params = { params: Promise<{ slug: string }> };

/** Figures a case-study section can pull in by key. */
const figures = {
  pipeline: PipelineDiagram,
  themeSwap: ThemeSwapDemo,
} as const;

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = work.find((item) => item.slug === slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const study = work.find((item) => item.slug === slug);
  if (!study) notFound();

  const next = work[(work.findIndex((i) => i.slug === study.slug) + 1) % work.length];

  return (
    <article>
      <section className="section section--flush case-hero">
        <div className="page">
          <div className="grid">
            <div className="margin">
              <div className="spec">
                <span className="spec__rule" aria-hidden="true" />
                <span className="spec__index">{study.index}</span>
                <span className="spec__name">case study</span>
                <span className="spec__dim">{study.sections.length} sections</span>
              </div>
            </div>

            <div className="content">
              <RegMarks />
              <p className="caption" style={{ marginBottom: "var(--space-4)" }}>
                <Link className="link" href="/#work">
                  Selected work
                </Link>
              </p>
              <h1 className="display-xl section__title">{study.title}</h1>
              <p className="lead">{study.summary}</p>

              <div className="row row--tight" style={{ marginTop: "var(--space-6)" }}>
                {study.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <dl className="case-meta" style={{ marginTop: "var(--space-8)" }}>
                <div>
                  <dt>role</dt>
                  <dd>
                    <MaybeTodo value={study.meta.role} />
                  </dd>
                </div>
                <div>
                  <dt>period</dt>
                  <dd>
                    <MaybeTodo value={study.meta.period} />
                  </dd>
                </div>
                <div>
                  <dt>surface</dt>
                  <dd>
                    <MaybeTodo value={study.meta.surface} />
                  </dd>
                </div>
                <div>
                  <dt>stack</dt>
                  <dd>
                    <MaybeTodo value={study.meta.stack} />
                  </dd>
                </div>
              </dl>

              {study.specimen ? (
                <div className="row" style={{ marginTop: "var(--space-8)" }}>
                  <Button href={study.specimen.href} variant="primary">
                    {study.specimen.label}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {study.sections.map((section, i) => (
        <Section
          key={section.heading}
          index={String(i + 1).padStart(2, "0")}
          name={section.heading.toLowerCase()}
          order={i + 1}
        >
          <h2 className="display-l section__title">{section.heading}</h2>
          <div className="prose">
            {section.body.map((paragraph, j) =>
              isTodo(paragraph) ? (
                <Placeholder key={j} note={paragraph.__todo} />
              ) : (
                <p key={j}>{paragraph}</p>
              )
            )}
          </div>

          {section.figure
            ? (() => {
                const Figure = figures[section.figure];
                return <Figure />;
              })()
            : null}
        </Section>
      ))}

      <Section index="--" name="outcomes" order={study.sections.length + 1}>
        <h2 className="display-l section__title">Outcomes</h2>
        {isTodo(study.outcomes) ? (
          <Placeholder note={study.outcomes.__todo} />
        ) : (
          <ul className="prose" style={{ paddingLeft: "var(--space-4)" }}>
            {study.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        )}

        <div className="row" style={{ marginTop: "var(--space-12)" }}>
          <Button href={`/work/${next.slug}`} variant="secondary">
            Next: {next.title}
          </Button>
          <Button href="/#contact" variant="quiet">
            Get in touch
          </Button>
        </div>
      </Section>
    </article>
  );
}
