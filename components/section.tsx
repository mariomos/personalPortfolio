import type { ReactNode } from "react";
import { RegMarks, SectionSpec } from "@/components/annotation";

/**
 * Every section is the same shape: a spec block in the annotation margin,
 * registration marks on the content block, content in columns 3-10.
 * Sections do not each invent their own geometry - that is the point.
 */
export function Section({
  id,
  index,
  name,
  dimensions,
  order = 0,
  flush,
  children,
}: {
  id?: string;
  index: string;
  name: string;
  dimensions?: string;
  order?: number;
  flush?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section${flush ? " section--flush" : ""}`}>
      <div className="page">
        <div className="grid">
          <div className="margin">
            <SectionSpec index={index} name={name} dimensions={dimensions} order={order} />
          </div>
          <div className="content">
            <RegMarks order={order} />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
