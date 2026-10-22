import type { ReactNode } from "react";

/**
 * Pretty-prints JSON the way a person would write it: objects open up, short
 * arrays stay on one line, so a solve rule reads as one rule rather than six
 * lines of brackets. Rendered on the server - no highlighter ships.
 */
export function formatJson(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  const inner = "  ".repeat(indent + 1);

  if (Array.isArray(value)) {
    const flat = JSON.stringify(value);
    if (flat.length <= 72 && !value.some((v) => v !== null && typeof v === "object" && !Array.isArray(v))) {
      return flat.replace(/,(?=\S)/g, ", ");
    }
    return `[\n${value.map((v) => inner + formatJson(v, indent + 1)).join(",\n")}\n${pad}]`;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "{}";
    const body = entries
      .map(([k, v]) => `${inner}${JSON.stringify(k)}: ${formatJson(v, indent + 1)}`)
      .join(",\n");
    return `{\n${body}\n${pad}}`;
  }

  return JSON.stringify(value);
}

const TOKEN = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b/g;
const HEX = /^"#[0-9a-f]{6}"$/i;

function highlight(source: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of Array.from(source.matchAll(TOKEN))) {
    const [whole, str, colon, num, lit] = match;
    const at = match.index;
    if (at > last) out.push(source.slice(last, at));
    if (str && colon) {
      out.push(<span key={at} className="j-key">{str}</span>, colon);
    } else if (str) {
      out.push(
        <span key={at} className="j-str">
          {HEX.test(str) ? <span className="j-swatch" style={{ background: str.slice(1, -1) }} /> : null}
          {str}
        </span>
      );
    } else if (num) {
      out.push(<span key={at} className="j-num">{num}</span>);
    } else if (lit) {
      out.push(<span key={at} className="j-lit">{lit}</span>);
    }
    last = at + whole.length;
  }
  if (last < source.length) out.push(source.slice(last));
  return out;
}

export function JsonView({
  value,
  label,
  tall,
}: {
  value: unknown;
  /** Names the region for screen readers - it scrolls, so it takes focus. */
  label: string;
  /** Caps the height and scrolls, for whole files. */
  tall?: boolean;
}) {
  return (
    <pre className="code" data-tall={tall ? "true" : undefined} tabIndex={0} aria-label={label}>
      <code>{highlight(formatJson(value))}</code>
    </pre>
  );
}

/** Plain source text (CSS) in the same frame. */
export function CodeView({ source, label }: { source: string; label: string }) {
  return (
    <pre className="code" tabIndex={0} aria-label={label}>
      <code>{source}</code>
    </pre>
  );
}
