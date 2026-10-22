"use client";

import { useId, useState } from "react";
import { Switch } from "@/components/ui/switch";

/**
 * The claim this figure has to demonstrate: a theme change moves through the
 * token layer, so anything consuming tokens re-themes without being touched,
 * and the engineering effort concentrates on the exceptions.
 *
 * So the demo shows both halves. Flip the theme and most of the mock moves.
 * Two elements do not, because they carry hard-coded local values - and those
 * are the ones that cost days. Turning on "show exceptions" marks them.
 *
 * The themes are defined once, here, and applied as custom properties on the
 * wrapper. The readout beside the mock reads the same object the styles do,
 * because a demo about single sources of truth should not have two.
 */

type Theme = {
  id: string;
  name: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  onAccent: string;
  line: string;
  radius: string;
};

const themes: Theme[] = [
  {
    id: "01",
    name: "Neutral",
    bg: "#FFFFFF",
    surface: "#F4F5F7",
    text: "#1A1F2B",
    muted: "#5C6675",
    accent: "#2F5BEA",
    onAccent: "#FFFFFF",
    line: "#DDE1E7",
    radius: "2px",
  },
  {
    id: "02",
    name: "Signal",
    bg: "#FFF8FB",
    surface: "#FBE9F3",
    text: "#2B1020",
    muted: "#6E4257",
    accent: "#B81C6E",
    onAccent: "#FFFFFF",
    line: "#F0CFE1",
    radius: "10px",
  },
  {
    id: "03",
    name: "Ink",
    bg: "#12161F",
    surface: "#1C2230",
    text: "#F2F4F7",
    muted: "#9AA3B2",
    accent: "#3BBFB3",
    onAccent: "#0B1016",
    line: "#2C3444",
    radius: "4px",
  },
];

/** Every pair here was contrast-checked before it shipped. */
const readout = (t: Theme) => [
  ["--bg", t.bg],
  ["--surface", t.surface],
  ["--text", t.text],
  ["--muted", t.muted],
  ["--accent", t.accent],
  ["--radius", t.radius],
];

export function ThemeSwapDemo() {
  const [themeId, setThemeId] = useState("01");
  const [showExceptions, setShowExceptions] = useState(false);
  const groupId = useId();
  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

  const vars = {
    ["--demo-bg"]: theme.bg,
    ["--demo-surface"]: theme.surface,
    ["--demo-text"]: theme.text,
    ["--demo-muted"]: theme.muted,
    ["--demo-accent"]: theme.accent,
    ["--demo-on-accent"]: theme.onAccent,
    ["--demo-line"]: theme.line,
    ["--demo-radius"]: theme.radius,
  } as React.CSSProperties;

  return (
    <figure className="demo">
      <div className="demo__controls">
        <div className="demo__themes" role="group" aria-labelledby={groupId}>
          <span className="mono demo__controls-label" id={groupId}>
            theme
          </span>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              className="btn"
              data-variant={t.id === themeId ? "primary" : "secondary"}
              data-size="sm"
              aria-pressed={t.id === themeId}
              onClick={() => setThemeId(t.id)}
            >
              <span className="mono">{t.id}</span> {t.name}
            </button>
          ))}
        </div>

        <Switch checked={showExceptions} onChange={setShowExceptions}>
          <span className="mono">show exceptions</span>
        </Switch>
      </div>

      <div className="demo__body">
        {/* The mock product surface. Nothing in here is styled per theme - it
            only ever references the custom properties set on this wrapper. */}
        <div
          className="demo__stage"
          style={vars}
          data-exceptions={showExceptions ? "on" : undefined}
        >
          <div className="demo-ui">
            <header className="demo-ui__bar">
              <span className="demo-ui__mark" aria-hidden="true" />
              <span className="demo-ui__brand">Console</span>
              <span className="demo-ui__spacer" />
              {/* Exception 1: a nav pill that kept a local hex and a local
                  radius from the previous theme. */}
              <span
                className="demo-ui__pill demo-ui__exception"
                data-exception="local colour + radius"
              >
                Beta
              </span>
            </header>

            <div className="demo-ui__content">
              <p className="demo-ui__eyebrow">Overview</p>
              <p className="demo-ui__title">Deployment health</p>
              <p className="demo-ui__body">
                All regions reporting. Last sync two minutes ago.
              </p>

              <div className="demo-ui__cards">
                <div className="demo-ui__card">
                  <span className="demo-ui__stat">98.4%</span>
                  <span className="demo-ui__label">Uptime</span>
                </div>
                <div className="demo-ui__card">
                  <span className="demo-ui__stat">1,284</span>
                  <span className="demo-ui__label">Requests</span>
                </div>
                {/* Exception 2: a card built before the tokens existed. */}
                <div
                  className="demo-ui__card demo-ui__exception"
                  data-exception="local surface + border"
                >
                  <span className="demo-ui__stat">12</span>
                  <span className="demo-ui__label">Alerts</span>
                </div>
              </div>

              <div className="demo-ui__field">
                <span className="demo-ui__label">Region filter</span>
                <span className="demo-ui__input">eu-west-1</span>
              </div>

              <div className="demo-ui__actions">
                <span className="demo-ui__btn demo-ui__btn--primary">Deploy</span>
                <span className="demo-ui__btn">Cancel</span>
              </div>
            </div>
          </div>
        </div>

        <div className="demo__readout">
          <p className="mono demo__readout-title">
            theme {theme.id} · {theme.name}
          </p>
          <dl className="demo__tokens">
            {readout(theme).map(([name, value]) => (
              <div key={name}>
                <dt className="value">{name}</dt>
                <dd className="value">
                  {!value.endsWith("px") ? (
                    <span
                      className="demo__swatch"
                      style={{ background: value }}
                      aria-hidden="true"
                    />
                  ) : null}
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="demo__readout-note">
            {showExceptions
              ? "Two elements ignore the theme: they carry local values instead of tokens. On a real site those are the pages that need hand work, and they are what a re-theme actually costs."
              : "Six values change. Nothing in the mock is restyled per theme - it only references the tokens above."}
          </p>
        </div>
      </div>

      <figcaption className="demo__caption">
        Flip the theme. The work is whatever does not move.
      </figcaption>
    </figure>
  );
}
