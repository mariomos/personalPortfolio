import localFont from "next/font/local";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

/**
 * Display: Bricolage Grotesque, self-hosted as a variable font so the width
 * axis is actually available. Headlines compress as the viewport narrows -
 * see `--width-*` in tokens/tokens.json and the .display-* rules in type.css.
 */
export const display = localFont({
  src: "./fonts/BricolageGrotesque-variable.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

/** Body: engineering vernacular without being cold. */
export const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-body",
  fallback: ["system-ui", "sans-serif"],
});

/** Mono: real token values only. Never a decorative label. */
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const fontClassNames = [display.variable, body.variable, mono.variable].join(" ");
