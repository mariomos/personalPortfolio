import { leading, practice } from "@/lib/content";
import { Section } from "@/components/section";

export function Practice() {
  return (
    <Section
      id="practice"
      index="03"
      name="how i work"
      dimensions={`${practice.items.length} principles`}
      order={4}
    >
      <h2 className="display-l section__title">How I work</h2>
      <p className="section__intro">{practice.intro}</p>

      <div className="practice" style={{ marginTop: "var(--space-12)" }}>
        {practice.items.map((item) => (
          <div key={item.title} className="practice__item">
            <h3 className="display-s practice__title">{item.title}</h3>
            <p className="practice__body">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="leading">
        <h3 className="display-m section__title">{leading.heading}</h3>
        <p className="section__intro">{leading.intro}</p>
        <ul className="leading__list">
          {leading.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
