"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";
import { Controls } from "@/components/controls";

export function SiteHeader() {
  const pathname = usePathname();

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
            {nav.map((item) => {
              const isRoute = item.href.startsWith("/") && !item.href.includes("#");
              const current = isRoute && pathname === item.href;
              return (
                <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Controls />
        </div>
      </div>
    </header>
  );
}
