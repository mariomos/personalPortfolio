import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import source from "@/tokens/tokens.json";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { StateLabel } from "@/components/annotation";
import { CodeView, JsonView, formatJson } from "@/components/library/json-view";
import { tokens, semanticColors, tokenVersion, a11yTargets } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Design tokens",
  description:
    "The published token distribution for mariomos.com in full, and one token followed from its source rule to the pixels it paints.",
};

/** The role the trace follows. Every step below is read from a real file. */
const ROLE = "accent-text";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

/** The first rule in `css` that starts with `selector`, as written. */
function extractRule(css: string, selector: string, file: string) {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`${file} no longer contains ${selector} - update the token trace`);
  const end = css.indexOf("}", start);
  const indent = css.slice(css.lastIndexOf("\n", start) + 1, start);
  return css
    .slice(start, end + 1)
    .split("\n")
    .map((line) => (line.startsWith(indent) ? line.slice(indent.length) : line))
    .join("\n");
}

/** The generated declaration for one role, under each scheme's selector. */
function generatedDeclarations(css: string, role: string) {
  return ["  :root, [data-theme='light'] {", "  [data-theme='dark'] {"]
    .map((selector) => {
      const block = css.indexOf(selector);
      const line = css.slice(block).split("\n").find((l) => l.trim().startsWith(`--c-${role}:`));
      if (block === -1 || !line) throw new Error(`app/tokens.css has no --c-${role} under ${selector.trim()}`);
      return `${selector.trim()}\n  ${line.trim()}\n}`;
    })
    .join("\n");
}

export default function Tokens() {
  const rule = {
    $use: source.semantic.$use[ROLE],
    light: { [ROLE]: source.semantic.light[ROLE] },
    dark: { [ROLE]: source.semantic.dark[ROLE] },
  };
  const published = {
    light: { [ROLE]: tokens.semantic.light[ROLE] },
    dark: { [ROLE]: tokens.semantic.dark[ROLE] },
  };
  const generated = generatedDeclarations(read("app/tokens.css"), ROLE);
  const consumer = extractRule(read("styles/annotations.css"), '.state-label[data-active="true"]', "styles/annotations.css");
  const solved = semanticColors.filter((t) => t.kind === "solved").length;
  const lines = formatJson(tokens).split("\n").length;
  const light = tokens.semantic.light[ROLE];

  return (
    <>
      <Section index="00" name="tokens / index" dimensions={`v${tokenVersion} · ${semanticColors.length} roles`} order={0} flush>
        <h1 className="display-xl section__title">Design tokens</h1>
        <p className="lead">
          One source file generates the stylesheet, the typed module the components read, and the
          published distribution on this page. This is that file in full - every value, how it was
          derived, and the contrast it was checked at.
        </p>
        <div className="row" style={{ marginTop: "var(--space-8)" }}>
          <Button href="/tokens.json" variant="secondary">
            Open raw <span className="mono">tokens.json</span>
          </Button>
          <Button href="/tokens.json" variant="quiet" download="mariomos-tokens.json">
            Download
          </Button>
          <Button href="/components" variant="quiet">
            Component library
          </Button>
        </div>
      </Section>

      <Section index="01" name="tokens / one token, end to end" dimensions="5 steps" order={1}>
        <h2 className="display-l section__title">One token, end to end</h2>
        <p className="section__intro">
          Following <span className="mono">{ROLE}</span> from the rule that defines it to the label it
          colours. Nothing in this trace is typed by hand - each step is read from the file it names
          when the site is built.
        </p>

        <ol className="trace">
          <li>
            <div className="trace__about">
              <p className="trace__step">01 source</p>
              <p className="value">tokens/tokens.json</p>
              <p className="specimen__notes">
                A rule, not a value. Start from the redline, blend toward ink (or paper in dark), and
                stop at the first step that clears the <span className="mono">text</span> target of{" "}
                {a11yTargets.text}:1 on the page background and on the quiet tint labels sit on.
              </p>
            </div>
            <JsonView value={rule} label={`Source rule for ${ROLE}`} />
          </li>

          <li>
            <div className="trace__about">
              <p className="trace__step">02 build</p>
              <p className="value">scripts/build-tokens.mjs → public/tokens.json</p>
              <p className="specimen__notes">
                The build solves the rule and publishes the answer with its working: where the value
                came from, and the ratio at its worst pairing. Here that is{" "}
                <span className="mono">{light.contrast}:1</span> on{" "}
                <span className="mono">{light.contrastAgainst}</span>. Below the target, the build fails.
              </p>
            </div>
            <JsonView value={published} label={`Published entry for ${ROLE}`} />
          </li>

          <li>
            <div className="trace__about">
              <p className="trace__step">03 stylesheet</p>
              <p className="value">app/tokens.css</p>
              <p className="specimen__notes">
                The same build writes one custom property per scheme. Components never see a hex
                value, only the role.
              </p>
            </div>
            <CodeView source={generated} label={`Generated CSS for ${ROLE}`} />
          </li>

          <li>
            <div className="trace__about">
              <p className="trace__step">04 component</p>
              <p className="value">styles/annotations.css</p>
              <p className="specimen__notes">
                The active state label asks for the role by name, on the tint it was solved against.
              </p>
            </div>
            <CodeView source={consumer} label="CSS rule consuming the token" />
          </li>

          <li>
            <div className="trace__about">
              <p className="trace__step">05 rendered</p>
              <p className="value">components/annotation · components/ui/tag</p>
              <p className="specimen__notes">
                Live components, not pictures of them. Switch the theme in the header and the value
                underneath changes; the components do not.
              </p>
            </div>
            <div className="specimen__stage">
              <StateLabel active>active</StateLabel>
              <Tag tone="accent">Accent</Tag>
            </div>
          </li>
        </ol>
      </Section>

      <Section index="02" name="tokens / the file" dimensions={`${lines} lines`} order={2}>
        <h2 className="display-l section__title">The whole file</h2>
        <p className="section__intro">
          Everything the build publishes, exactly as served at{" "}
          <span className="mono">/tokens.json</span>: six primitives, {semanticColors.length} roles
          per scheme ({solved} of them solved for contrast), and the space, type, grid, border and
          motion scales. Hex values carry a swatch.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <JsonView value={tokens} label="tokens.json, the full published distribution" tall />
        </div>
      </Section>
    </>
  );
}
