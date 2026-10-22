import { hero, scope, site } from "@/lib/content";
import { Measure, RegMarks } from "@/components/annotation";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-statement">
      <div className="page">
        <div className="grid">
          {/* The margin gauge measures the block beside it. Both numbers are
              read from the spacing scale, not typed in. */}
          <div className="margin">
            <div className="hero__gauge">
              <Measure step={16} axis="v" order={0} />
              <Measure step={6} axis="h" order={1} />
              <Measure step={24} axis="v" order={2} />
            </div>
          </div>

          <div className="content">
            <RegMarks order={1} />

            <h1 id="hero-statement" className="display-xl hero__statement">
              {hero.statement}
            </h1>

            <p className="hero__meta">
              <strong>{site.role}</strong>
              <span>
                Leading frontend and design systems across five products at {site.company}.
              </span>
              <span>{hero.range}</span>
            </p>

            {/* Citizenship and location are the first thing a hiring manager
                outside South Africa needs to know, so they are not buried. */}
            <p className="hero__eligibility">{site.eligibility}</p>

            <div className="row">
              <Button href="/#work" variant="primary" size="lg">
                See the work
              </Button>
              <Button href={site.cv} variant="secondary" size="lg">
                CV
              </Button>
            </div>

            {/* Scope at a glance, for the reader who decides in ten seconds
                whether to read the other two thousand words. Every figure
                below is a fact from the CV, not a rounded estimate. */}
            <dl className="scope">
              {scope.map((item) => (
                <div key={item.label} className="scope__item">
                  <dt className="scope__value">{item.value}</dt>
                  <dd className="scope__label">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
