import { about } from "@/lib/content";
import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" index="05" name="about" dimensions={`${about.paragraphs.length} paragraphs`} order={6}>
      <h2 className="display-l section__title">About</h2>
      <div className="prose" style={{ marginTop: "var(--space-6)" }}>
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
