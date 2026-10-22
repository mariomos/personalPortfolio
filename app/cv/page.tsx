import type { Metadata } from "next";
import {
  about,
  certifications,
  contact,
  experience,
  isTodo,
  languages,
  site,
  skills,
} from "@/lib/content";
import { RegMarks, SectionSpec } from "@/components/annotation";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CV",
  description: site.description,
};

/**
 * The CV as a page rather than an attachment. It is generated from the same
 * content the rest of the site renders, so it cannot fall out of date with
 * the work section - and it carries a print stylesheet, so Print to PDF
 * produces the document version without a second source to maintain.
 */
export default function CV() {
  const reachable = contact.links.filter((l) => !isTodo(l.href) && l.label !== "CV");

  return (
    <div className="page">
      <div className="grid">
        <div className="margin">
          <SectionSpec index="CV" name="curriculum vitae" dimensions="print ready" order={0} />
        </div>

        <div className="content">
          <RegMarks />

          <header className="cv-header">
            <div className="cv-identity">
              <h1 className="display-xl">{site.name}</h1>
            </div>
            <p className="lead" style={{ marginBottom: "var(--space-6)" }}>
              {site.role} Twelve years building for the web, the last three on the layer between
              design and production.
            </p>

            <div className="cv-contacts">
              {reachable.map((link) => (
                <a key={link.label} href={link.href as string}>
                  {link.value as string}
                </a>
              ))}
            </div>

            <p className="cv-eligibility">{site.eligibility}</p>

            <div className="row cv-print-hide" style={{ marginTop: "var(--space-8)" }}>
              <Button href="/#contact" variant="primary">
                Get in touch
              </Button>
              <Button href="/work/design-to-dev-pipeline" variant="secondary">
                Read the case study
              </Button>
            </div>
          </header>

          <section className="cv-section">
            <p className="cv-section__label">profile</p>
            <div className="prose">
              <p>
                Frontend engineer specialising in design systems and the handoff between design and
                production. I build the token pipelines, component libraries and governance that
                keep multi-product suites consistent - currently across five products at{" "}
                {site.company}, where I lead frontend and design system work. Equally comfortable in
                React and Angular, in Figma and in a production codebase.
              </p>
            </div>
          </section>

          <section className="cv-section">
            <p className="cv-section__label">experience</p>
            {experience.map((role) => (
              <div key={`${role.org}-${role.when}`} className="exp-row" data-current={role.current}>
                <div className="exp-row__when">{role.when}</div>
                <div>
                  <h2 className="display-s exp-row__role">{role.role}</h2>
                  <p className="exp-row__org">
                    {role.org}, {role.where}
                  </p>
                  {role.summary ? <p className="exp-row__summary">{role.summary}</p> : null}
                  <ul className="exp-row__notes">
                    {role.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                  {role.stack ? <p className="exp-row__stack">{role.stack}</p> : null}
                </div>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <p className="cv-section__label">skills</p>
            <dl className="skill-list">
              {skills.map((group) => (
                <div key={group.group}>
                  <dt>{group.group}</dt>
                  <dd>{group.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="cv-section">
            <p className="cv-section__label">certifications</p>
            <ul className="cert-list">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  {cert.name}{" "}
                  <span className="cert-list__issuer">
                    {cert.issuer}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-section">
            <p className="cv-section__label">languages</p>
            <p>{languages}</p>
          </section>

          <section className="cv-section">
            <p className="cv-section__label">background</p>
            <div className="prose">
              <p>{about.paragraphs[0]}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
