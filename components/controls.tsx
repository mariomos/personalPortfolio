"use client";

import { useSyncExternalStore } from "react";
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

/* The <html> attributes are the source of truth - the boot script sets them
   before paint and the CSS reads them - so the switches subscribe to them
   rather than keeping a copy that could drift. */
const subscribeAttrs = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-anno", "data-grid"],
  });
  return () => observer.disconnect();
};
const useAttr = (attr: Attr) => useSyncExternalStore(subscribeAttrs, () => read(attr), () => null);

const darkQuery = "(prefers-color-scheme: dark)";
const subscribeScheme = (onChange: () => void) => {
  const query = window.matchMedia(darkQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
/** Null on the server and during hydration, when the system scheme is unknown. */
const useSystemDark = () =>
  useSyncExternalStore(subscribeScheme, () => window.matchMedia(darkQuery).matches, () => null);

/**
 * The inspect controls. Turning the annotation layer off is a first-class
 * option: the layer is the argument, but the visitor decides how loud it is.
 */
export function Controls() {
  const theme = useAttr("data-theme");
  const systemDark = useSystemDark();
  const anno = useAttr("data-anno") !== "off";
  const gridOn = useAttr("data-grid") === "on";
  const mounted = systemDark !== null;
  const dark = theme ? theme === "dark" : Boolean(systemDark);

  const toggleTheme = () => write("data-theme", dark ? "light" : "dark", "mm-theme");

  return (
    <div className="toolbar">
      <div className="toolbar__switches">
        <Switch
          checked={gridOn}
          onChange={(next) => write("data-grid", next ? "on" : null, "mm-grid")}
          title="Show the 12-column grid"
        >
          <span className="mono">grid</span>
        </Switch>
        <Switch
          checked={anno}
          onChange={(next) => write("data-anno", next ? null : "off", "mm-anno")}
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
