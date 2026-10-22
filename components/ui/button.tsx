import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = Common &
  Omit<ComponentPropsWithoutRef<"button">, keyof Common> & { href?: undefined };

type ButtonAsLink = Common &
  Omit<ComponentPropsWithoutRef<"a">, keyof Common> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The one button. Variant and size are data attributes rather than class
 * permutations, so a component's state is readable in the DOM inspector -
 * which is also how the library documents it.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "secondary",
    size = "md",
    loading = false,
    children,
    className,
    ...rest
  } = props as Common & Record<string, unknown>;

  const shared = {
    className: ["btn", className].filter(Boolean).join(" "),
    "data-variant": variant,
    "data-size": size,
    "data-loading": loading ? "true" : undefined,
  };

  const content = (
    <>
      {loading ? <span className="btn__spinner" aria-hidden="true" /> : null}
      {children}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as { href: string } & ComponentPropsWithoutRef<"a">;
    const external = /^(https?:|mailto:)/.test(href) || href.endsWith(".pdf");
    if (external) {
      return (
        <a
          {...shared}
          {...anchorRest}
          href={href}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link {...shared} {...(anchorRest as object)} href={href}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button {...shared} {...buttonRest} aria-busy={loading || undefined}>
      {content}
    </button>
  );
}
