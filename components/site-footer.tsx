import Link from "next/link";
import { site } from "@/lib/content";
import { tokenVersion } from "@/lib/tokens";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page">
        <div className="site-footer__inner">
          <p className="caption">
            {site.name} - {site.role}
          </p>

          <div className="site-footer__links">
            {/* The token source is linked, not described. Reading it is the
                fastest way to know whether this site means what it says. */}
            <a className="value link" href="/tokens.json">
              tokens.json <b>v{tokenVersion}</b>
            </a>
            <Link className="value link" href="/components">
              component library
            </Link>
            <Link className="value link" href="/colophon">
              colophon
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
