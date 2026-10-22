"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Controls } from "@/components/controls";

type Current = "page" | "location" | "true" | undefined;

/** `trailingSlash: true` serves "/cv/"; nav hrefs are written as "/cv". */
const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/**
 * The id of the home-page section crossing the upper third of the viewport.
 * Sections without a nav item (hero, experience, about) leave nothing lit.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      // The last section can be too short to ever reach the line.
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
        setActive(sections[sections.length - 1]?.id ?? null);
        return;
      }
      const line = window.innerHeight / 3;
      const hit = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= line && r.bottom > line;
      });
      setActive(hit?.id ?? null);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  return active;
}

/**
 * Routes are current on themselves and anything nested under them. Section
 * links ("/#work") are current while that section is on screen, and also own
 * the routes named after them - the case studies under /work/.
 */
function currentFor(href: string, pathname: string, section: string | null): Current {
  const [path, hash] = href.split("#");
  if (!hash) {
    if (pathname === path) return "page";
    return pathname.startsWith(`${path}/`) ? "true" : undefined;
  }
  if (pathname === "/") return section === hash ? "location" : undefined;
  return pathname.startsWith(`/${hash}/`) ? "true" : undefined;
}

export function SiteHeader() {
  const pathname = normalise(usePathname());
  const section = useActiveSection(pathname === "/");

  return (
    <header className="site-header">
      <div className="page">
        <div className="site-header__inner">
          <Link href="/" className="wordmark">
            <span className="wordmark__mark" aria-hidden="true">
              ◆
            </span>
            {site.shortName}
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={currentFor(item.href, pathname, section)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Controls />
        </div>
      </div>
    </header>
  );
}
