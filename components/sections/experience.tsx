import { certifications, experience, languages, skills } from "@/lib/content";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";

export function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      name="experience"
      dimensions={`${experience.length} roles · 12 years`}
      order={5}
    >
      <h2 className="display-l section__title">Experience</h2>
      <p className="section__intro">
        Twelve years, ending up where the interesting problems are.
      </p>

      <div style={{ marginTop: "var(--space-8)" }}>
        {experience.map((role) => (
          <div key={`${role.org}-${role.when}`} className="exp-row" data-current={role.current}>
            <div className="exp-row__when">{role.when}</div>

            <div>
              <h3 className="display-s exp-row__role">{role.role}</h3>
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
      </div>

      <div className="split" style={{ marginTop: "var(--space-12)" }}>
        <div>
          <h3 className="display-s" style={{ marginBottom: "var(--space-4)" }}>
            Skills
          </h3>
          <dl className="skill-list">
            {skills.map((group) => (
              <div key={group.group}>
                <dt>{group.group}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
          <p className="caption" style={{ marginTop: "var(--space-6)" }}>
            {languages}
          </p>
        </div>

        <div>
          <h3 className="display-s" style={{ marginBottom: "var(--space-4)" }}>
            Certifications
          </h3>
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
        </div>
      </div>

      <div className="row" style={{ marginTop: "var(--space-12)" }}>
        <Button href="/cv" variant="secondary">
          Full CV
        </Button>
      </div>
    </Section>
  );
}
