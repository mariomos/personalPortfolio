import type { ReactNode } from "react";

export function Tag({ children, tone }: { children: ReactNode; tone?: "accent" }) {
  return (
    <span className="tag" data-tone={tone}>
      {children}
    </span>
  );
}
