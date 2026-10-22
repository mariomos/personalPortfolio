import { space, grid } from "@/lib/tokens";

/**
 * The annotation layer.
 *
 * These are server components with no state - the whole layer is driven by
 * two attributes on <html> (data-anno, data-grid) that the controls flip.
 * The values they display are read from the token distribution, so a mark
 * cannot disagree with the spacing it is measuring.
 */

type MeasureProps = {
  /** A step on the spacing scale. The mark's length and label both come from it. */
  step: number;
  axis?: "v" | "h";
  /** Show the token name rather than the raw pixel value. */
  showToken?: boolean;
  tone?: "measure" | "redline";
  /** Stagger position in the load animation. */
  order?: number;
  label?: string;
};

export function Measure({
  step,
  axis = "v",
  showToken = false,
  tone = "measure",
  order = 0,
  label,
}: MeasureProps) {
  const px = space(step);
  const text = label ?? (showToken ? `--space-${step}` : String(px));
  const glyph = axis === "v" ? "↕" : "↔";

  return (
    <span
      className={`measure measure--${axis}${tone === "redline" ? " measure--redline" : ""}`}
      style={{ ["--len" as string]: `${px}px`, ["--i" as string]: order }}
      aria-hidden="true"
    >
      <span className="measure__line" />
      <span className="measure__label">
        {glyph}
        {text}
      </span>
    </span>
  );
}

/**
 * The margin block that labels a section: index, name, and the dimensions
 * of the thing it sits beside. Sticks to the section as you scroll past.
 */
export function SectionSpec({
  index,
  name,
  dimensions,
  order = 0,
}: {
  index: string;
  name: string;
  dimensions?: string;
  order?: number;
}) {
  return (
    <div className="spec" style={{ ["--i" as string]: order }}>
      <span className="spec__rule" aria-hidden="true" />
      <span className="spec__index">{index}</span>
      <span className="spec__name">{name}</span>
      {dimensions ? <span className="spec__dim">{dimensions}</span> : null}
    </div>
  );
}

/** Registration crosses, the way a print proof marks its corners. */
export function RegMarks({ order = 0 }: { order?: number }) {
  return (
    <>
      <span className="regmark regmark--tl" style={{ ["--i" as string]: order }} aria-hidden="true" />
      <span className="regmark regmark--tr" style={{ ["--i" as string]: order + 1 }} aria-hidden="true" />
    </>
  );
}

/** A token value with a leader line. Mono, because it is a real value. */
export function TokenCallout({
  token,
  value,
  order = 0,
}: {
  token: string;
  value: string;
  order?: number;
}) {
  return (
    <span className="callout" style={{ ["--i" as string]: order }}>
      <span>
        <b>{token}</b>: {value}
      </span>
    </span>
  );
}

/** Inspect-panel style state label, used throughout the component library. */
export function StateLabel({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className="state-label" data-active={active ? "true" : undefined}>
      {children}
    </span>
  );
}

/**
 * The 12-column overlay. Purely presentational and pointer-transparent;
 * visibility is CSS, driven by html[data-grid="on"].
 */
export function GridOverlay() {
  const columns = Array.from({ length: grid.columns }, (_, i) => i + 1);
  return (
    <div className="anno-grid" aria-hidden="true">
      <div className="anno-grid__inner">
        {columns.map((col) => (
          <span
            key={col}
            className="anno-grid__col"
            data-role={col < grid["content-start"] ? "margin" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
