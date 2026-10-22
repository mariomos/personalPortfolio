import type { Metadata } from "next";
import "./globals.css";
import { fontClassNames } from "@/lib/fonts";
import { site } from "@/lib/content";
import { BootScript } from "@/components/boot-script";
import { GridOverlay } from "@/components/annotation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <BootScript />
        <meta name="theme-color" content="#F7F8FA" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#101A2B" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={fontClassNames}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <GridOverlay />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
