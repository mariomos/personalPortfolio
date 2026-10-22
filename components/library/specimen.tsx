import type { ReactNode } from "react";

/**
 * One documented component: the live thing on the left, what it is made of
 * on the right. The tokens listed are the tokens the component actually
 * consumes - if a component needs a value with no token name, that shows up
 * here as a gap.
 */
export function Specimen({
  name,
  summary,
  tokens,
  children,
  notes,
}: {
  name: string;
  summary: string;
  tokens: readonly string[];
  children: ReactNode;
  notes?: ReactNode;
}) {
  return (
    <div className="specimen" id={`specimen-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="stack stack-4">
        <div>
          <h3 className="display-m">{name}</h3>
          <p className="specimen__notes" style={{ marginTop: "var(--space-2)" }}>
            {summary}
          </p>
        </div>
        <div className="specimen__stage">{children}</div>
      </div>

      <div className="specimen__notes">
        {notes}
        <div>
          <p className="mono" style={{ color: "var(--c-measure-text)", marginBottom: "var(--space-2)" }}>
            tokens consumed
          </p>
          <ul className="stack stack-2" style={{ listStyle: "none", padding: 0 }}>
            {tokens.map((token) => (
              <li key={token} className="value">
                <b>{token}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
