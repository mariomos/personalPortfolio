import type { Metadata } from "next";
import { colophon } from "@/lib/content";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { tokenVersion } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "How this site is built: one token source, a contrast-solving build, a self-hosted variable display face, and an annotation layer that reads its numbers from the spacing scale.",
};

export default function Colophon() {
  return (
    <>
      <Section index="00" name="colophon" dimensions={`tokens v${tokenVersion}`} order={0} flush>
        <h1 className="display-xl section__title">Colophon</h1>
        <p className="lead">{colophon.intro}</p>
        <div className="row" style={{ marginTop: "var(--space-8)" }}>
          <Button href="/components" variant="secondary">
            Component library
          </Button>
          <Button href="/tokens" variant="quiet">
            <span className="mono">tokens.json</span>
          </Button>
        </div>
      </Section>

      {colophon.sections.map((section, i) => (
        <Section
          key={section.heading}
          index={String(i + 1).padStart(2, "0")}
          name={section.heading.toLowerCase()}
          order={i + 1}
        >
          <h2 className="display-l section__title">{section.heading}</h2>
          <div className="prose">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
