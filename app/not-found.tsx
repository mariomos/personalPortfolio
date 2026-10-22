import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section index="404" name="not found" order={0} flush>
      <h1 className="display-xl section__title">Nothing at this address</h1>
      <p className="lead">The page you asked for does not exist.</p>
      <div className="row" style={{ marginTop: "var(--space-8)" }}>
        <Button href="/" variant="primary">
          Back to the start
        </Button>
        <Button href="/components" variant="quiet">
          Component library
        </Button>
      </div>
    </Section>
  );
}
