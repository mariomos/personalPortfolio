import Link from "next/link";
import { work } from "@/lib/content";
import { Section } from "@/components/section";
import { Tag } from "@/components/ui/tag";

export function WorkIndex() {
  return (
    <Section id="work" index="01" name="selected work" dimensions={`${work.length} entries`} order={2}>
      <h2 className="display-l section__title">Selected work</h2>
      <p className="section__intro">
        Ordered by what I would most want to be asked about.
      </p>

      <div className="work-list" style={{ marginTop: "var(--space-8)" }}>
        {work.map((item) => (
          <Link key={item.slug} href={`/work/${item.slug}`} className="work-row">
            <span className="work-row__index">{item.index}</span>

            <span>
              <span className="display-m work-row__title">{item.title}</span>
              <span className="work-row__summary" style={{ display: "block" }}>
                {item.summary}
              </span>
              <span className="row row--tight work-row__tags">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </span>
            </span>

            <dl className="work-row__aside">
              <dt>role</dt>
              <dd>{item.meta.role}</dd>
              <dt>surface</dt>
              <dd>{item.meta.surface}</dd>
              <dt>stack</dt>
              <dd>{item.meta.stack}</dd>
            </dl>
          </Link>
        ))}
      </div>
    </Section>
  );
}
