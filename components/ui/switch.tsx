"use client";

import type { ReactNode } from "react";

/**
 * A toggle that is a real button with aria-pressed, not a styled checkbox.
 * Used by the annotation and grid controls in the header.
 */
export function Switch({
  checked,
  onChange,
  children,
  disabled,
  title,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children?: ReactNode;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      className="switch"
      aria-pressed={checked}
      disabled={disabled}
      title={title}
      onClick={() => onChange(!checked)}
    >
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      {children ? <span>{children}</span> : null}
    </button>
  );
}
