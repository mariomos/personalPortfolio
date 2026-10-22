"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

type Attr = "data-theme" | "data-anno" | "data-grid";

const read = (attr: Attr) =>
  typeof document === "undefined" ? null : document.documentElement.getAttribute(attr);

const write = (attr: Attr, value: string | null, key: string) => {
  const el = document.documentElement;
  if (value === null) el.removeAttribute(attr);
  else el.setAttribute(attr, value);
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* private mode - the preference just will not persist */
  }
};

/**
 * The inspect controls. Turning the annotation layer off is a first-class
 * option: the layer is the argument, but the visitor decides how loud it is.
 */
export function Controls() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);
  const [anno, setAnno] = useState(true);
  const [gridOn, setGridOn] = useState(false);

  useEffect(() => {
    const explicit = read("data-theme");
    setDark(
      explicit ? explicit === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    setAnno(read("data-anno") !== "off");
    setGridOn(read("data-grid") === "on");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    write("data-theme", next ? "dark" : "light", "mm-theme");
  };

  return (
    <div className="toolbar">
      <div className="toolbar__switches">
        <Switch
          checked={gridOn}
          onChange={(next) => {
            setGridOn(next);
            write("data-grid", next ? "on" : null, "mm-grid");
          }}
          title="Show the 12-column grid"
        >
          <span className="mono">grid</span>
        </Switch>
        <Switch
          checked={anno}
          onChange={(next) => {
            setAnno(next);
            write("data-anno", next ? null : "off", "mm-anno");
          }}
          title="Show measurement annotations"
        >
          <span className="mono">annotations</span>
        </Switch>
      </div>
      <button
        type="button"
        className="btn"
        data-variant="quiet"
        data-size="sm"
        onClick={toggleTheme}
        aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      >
        <span className="mono" suppressHydrationWarning>
          {mounted ? (dark ? "dark" : "light") : "theme"}
        </span>
      </button>
    </div>
  );
}
