import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { StateLabel } from "@/components/annotation";
import { primitiveColors, spaceScale, typeScale } from "@/lib/tokens";

/**
 * A sample of the library on the home page, rendered from the same
 * primitives and the same tokens as the real thing.
 */
export function LibraryTeaser() {
  return (
    <Section
      id="library"
      index="02"
      name="component library"
      dimensions={`${primitiveColors.length} colours · ${spaceScale.length} steps · ${typeScale.length} sizes`}
      order={3}
    >
      <h2 className="display-l section__title">A live component library</h2>
      <p className="section__intro">
        Not a Storybook link. The primitives this site is built from, documented from the same
        source that renders them, with every state and every token value on the page.
      </p>

      <div className="specimen" style={{ marginTop: "var(--space-8)", borderBottom: 0 }}>
        <div className="specimen__stage">
          <span className="specimen__cell">
            <Button variant="primary">Primary</Button>
            <StateLabel active>default</StateLabel>
          </span>
          <span className="specimen__cell">
            <Button variant="secondary">Secondary</Button>
            <StateLabel>secondary</StateLabel>
          </span>
          <span className="specimen__cell">
            <Button variant="secondary" loading>
              Loading
            </Button>
            <StateLabel>loading</StateLabel>
          </span>
          <span className="specimen__cell">
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <StateLabel>disabled</StateLabel>
          </span>
        </div>

        <div className="specimen__notes">
          <p>
            Every value on this page resolves to a token. The published distribution is a real file
            you can open.
          </p>
          <div className="row">
            <Button href="/components" variant="primary">
              Open the library
            </Button>
            <Button href="/tokens" variant="quiet">
              <span className="mono">tokens.json</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
