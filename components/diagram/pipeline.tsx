/**
 * The design-to-development pipeline, drawn.
 *
 * The point the diagram has to make is the one the prose takes four
 * paragraphs to make: across two frameworks you cannot share components, so
 * the shared thing is the layer underneath - tokens, naming, contract - and
 * both sides are generated from it rather than copying it.
 *
 * Colour follows the site's own rule: magenta is the generated path (the
 * thing that must not drift), cyan is annotation. Nothing is colour-alone -
 * every path is also labelled.
 */
export function PipelineDiagram() {
  return (
    <figure className="diagram">
      <div className="diagram__scroll">
        <svg
          className="diagram__svg"
          viewBox="0 0 900 420"
          role="img"
          aria-labelledby="pipeline-title pipeline-desc"
        >
          <title id="pipeline-title">The design-to-development pipeline</title>
          <desc id="pipeline-desc">
            One token source sits between a React design repository and an Angular production
            stack. It generates artefacts for both sides, so neither holds a copy. Changes enter
            the token source only through a governance gate of branch protection, mandatory
            reviewer approval and Definition of Ready and Done checks. The production stack
            serves five products in one suite.
          </desc>

          <defs>
            <marker
              id="arrow-generated"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="diagram__arrowhead" />
            </marker>
            <marker
              id="arrow-proposed"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="diagram__arrowhead diagram__arrowhead--quiet" />
            </marker>
          </defs>

          {/* ---------------------------------------------------- columns -- */}

          <g className="diagram__col">
            <rect x="1" y="20" width="228" height="132" rx="2" />
            <text className="diagram__eyebrow" x="17" y="46">design source</text>
            <text className="diagram__heading" x="17" y="74">Design repository</text>
            <text className="diagram__item" x="17" y="100">React</text>
            <text className="diagram__item" x="17" y="120">Untitled UI</text>
            <text className="diagram__item" x="17" y="140">Storybook</text>
          </g>

          <g className="diagram__col diagram__col--source">
            <rect x="336" y="20" width="228" height="132" rx="2" />
            <text className="diagram__eyebrow diagram__eyebrow--accent" x="352" y="46">
              source of truth
            </text>
            <text className="diagram__heading" x="352" y="74">Token layer</text>
            <text className="diagram__item" x="352" y="100">Design tokens</text>
            <text className="diagram__item" x="352" y="120">Naming and contract</text>
            <text className="diagram__item" x="352" y="140">Handoff schema</text>
          </g>

          <g className="diagram__col">
            <rect x="671" y="20" width="228" height="132" rx="2" />
            <text className="diagram__eyebrow" x="687" y="46">production</text>
            <text className="diagram__heading" x="687" y="74">Product stack</text>
            <text className="diagram__item" x="687" y="100">Angular</text>
            <text className="diagram__item" x="687" y="120">Spartan</text>
            <text className="diagram__item" x="687" y="140">TypeScript</text>
          </g>

          {/* --------------- generated outward: neither side holds a copy -- */}

          <g className="diagram__path diagram__path--generated">
            <line x1="336" y1="72" x2="237" y2="72" markerEnd="url(#arrow-generated)" />
            <line x1="564" y1="72" x2="663" y2="72" markerEnd="url(#arrow-generated)" />
          </g>
          <text className="diagram__label diagram__label--accent" x="286" y="62" textAnchor="middle">
            generates
          </text>
          <text className="diagram__label diagram__label--accent" x="614" y="62" textAnchor="middle">
            generates
          </text>

          {/* ---- inward, and only through the gate: a change is proposed -- */}

          <g className="diagram__path diagram__path--proposed">
            <path d="M 115 152 L 115 258 L 278 258" markerEnd="url(#arrow-proposed)" />
            <path d="M 450 204 L 450 160" markerEnd="url(#arrow-proposed)" />
          </g>
          <text className="diagram__label" x="127" y="248">proposes</text>
          <text className="diagram__label" x="462" y="186">admitted</text>

          <g className="diagram__gate">
            <rect x="286" y="204" width="328" height="112" rx="2" />
            <text className="diagram__eyebrow diagram__eyebrow--accent" x="302" y="230">
              governance gate
            </text>
            <text className="diagram__item" x="302" y="256">Branch protection</text>
            <text className="diagram__item" x="302" y="276">Mandatory reviewer approval</text>
            <text className="diagram__item" x="302" y="296">Definition of ready and done</text>
          </g>

          {/* ---------------------------------------------------- products -- */}

          <g className="diagram__path diagram__path--generated">
            <line x1="785" y1="152" x2="785" y2="352" markerEnd="url(#arrow-generated)" />
          </g>
          <text className="diagram__eyebrow" x="671" y="382">serves</text>
          <text className="diagram__products" x="671" y="406">
            Five products in one suite
          </text>

          {/* The two sentences the whole drawing exists to make. */}
          <text className="diagram__note diagram__note--wide" x="1" y="344">
            The renderings differ because
          </text>
          <text className="diagram__note diagram__note--wide" x="1" y="362">
            they must. The contract does not.
          </text>

          <text className="diagram__note" x="286" y="344">
            Nothing reaches the shared layer
          </text>
          <text className="diagram__note" x="286" y="362">
            without a second pair of eyes.
          </text>

        </svg>
      </div>
      <figcaption className="diagram__caption">
        One token source, two framework renderings, one way in.
      </figcaption>
    </figure>
  );
}
