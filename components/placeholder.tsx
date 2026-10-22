import { isTodo, type Todo } from "@/lib/content";

/**
 * Renders an unfilled content slot loudly. Placeholders are magenta and
 * dashed so they cannot be mistaken for finished copy in a review, and so
 * nothing ships with an invented fact standing in for a real one.
 */
export function Placeholder({ note }: { note: string }) {
  return (
    <p className="placeholder" role="note">
      TODO - {note}
    </p>
  );
}

export function MaybeTodo({ value }: { value: unknown }) {
  if (isTodo(value)) return <Placeholder note={(value as Todo).__todo} />;
  return <>{value as string}</>;
}
