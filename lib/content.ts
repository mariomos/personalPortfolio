/**
 * All site copy lives here.
 *
 * ── A note on placeholders ──────────────────────────────────────────────
 * Anything wrapped in TODO() is copy that has no source in the CV or the
 * repo. It renders as a visible magenta dashed block on the page so it
 * cannot ship by accident. Search this file for "TODO(" to find every one.
 * Do not replace them with invented numbers - a fabricated metric on a
 * portfolio aimed at hiring managers is worse than a blank.
 *
 * Every figure below comes from the CV. Nothing here is estimated.
 */
export const TODO = (note: string) => ({ __todo: note });
export type Todo = ReturnType<typeof TODO>;
export const isTodo = (v: unknown): v is Todo =>
  typeof v === "object" && v !== null && "__todo" in v;

export const site = {
  name: "Mario Moshogiannis",
  shortName: "Mario Moshogiannis",
  role: "Senior frontend engineer. Design systems lead.",
  company: "Exelia Technologies",
  location: "Cape Town",
  /** The thing a hiring manager outside South Africa needs first. */
  eligibility: "Based in Cape Town, South Africa. EU citizen, Greek passport.",
  email: "mario.mosx@gmail.com",
  phone: "+27 81 882 3111",
  phoneHref: "tel:+27818823111",
  linkedin: "https://www.linkedin.com/in/mario-moshogiannis",
  cv: "/cv",
  url: "https://mariomos.com",
  title: "Mario Moshogiannis - Senior frontend engineer and design systems lead",
  description:
    "I build the token pipelines, component libraries and governance that keep design and code in sync - currently across five products at Exelia Technologies. Senior frontend engineer working across React, Angular, React Native and Node, based in Cape Town.",
} as const;

export const hero = {
  statement: "I build the systems that keep design and code in sync.",
  supporting:
    "Design tokens, component libraries, handoff and governance - the layer between a Figma file and production code.",
  /** Range under the speciality, so a general frontend or full-stack reader sees it too. */
  range: "Hands-on across React, Angular, React Native, Node and GraphQL.",
};

/**
 * The four numbers that establish scope at a glance, for a hiring manager who
 * will not read 2,000 words before deciding whether to. Each one is a fact
 * from the CV, not a derived or rounded figure.
 */
export const scope = [
  { value: "5", label: "Products sharing one token layer" },
  { value: "2", label: "Frameworks bridged by one token layer" },
  { value: "18", label: "Artifacts in the operating model" },
  { value: "12", label: "Years building for the web" },
];

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Components", href: "/components" },
  { label: "Practice", href: "/#practice" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/#contact" },
];

/* ------------------------------------------------------------------ work -- */

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  tags: readonly string[];
  meta: { role: string; period: string; surface: string; stack: string };
  sections: readonly {
    heading: string;
    body: readonly (string | Todo)[];
    /** Key into the figure registry in app/work/[slug]/page.tsx. */
    figure?: "pipeline" | "themeSwap";
  }[];
  outcomes: readonly string[] | Todo;
  specimen?: { href: string; label: string };
};

export const work: readonly CaseStudy[
] = [
  {
    slug: "design-to-dev-pipeline",
    index: "01",
    title: "One token layer, two frameworks",
    summary:
      "A React design repository and an Angular production stack, bridged by one shared token layer and component library across a five-product suite - with the operating model and governance that keep the two from drifting.",
    tags: ["Design tokens", "Governance", "Handoff", "Cross-framework"],
    meta: {
      role: "Design systems and frontend lead",
      period: "Mar 2024 - present",
      surface: "Five products in one suite",
      stack: "React, Untitled UI, Storybook, Angular, Spartan, TypeScript",
    },
    sections: [
      {
        heading: "The problem",
        body: [
          "Design and engineering were working in different frameworks. The design repository was React, Untitled UI and Storybook. Production was Angular and Spartan. Five products in the same suite drew on both, and nothing structural connected them.",
          "So the two halves agreed on paper and disagreed everywhere else. Values were copied rather than shared, differences surfaced late in review, and every correction was manual, which made every correction a fresh chance to drift. The expensive part was not the visual inconsistency. It was that nobody could answer a simple question with confidence: what is the actual value of this thing, right now, in the product?",
        ],
      },
      {
        heading: "Designing the bridge",
        figure: "pipeline",
        body: [
          "Two frameworks is the hard version of this problem, because you cannot solve it by sharing components - a React component is of no use to an Angular template. What can be shared is everything underneath: the token layer, the naming, the component contract and the handoff schema.",
          "I built the pipeline so that both stacks consume one set of design tokens rather than each holding a copy, and a component library bridges the two - the design repository and the production stack render the same decisions through different implementations. The contract is the shared surface. The rendering is allowed to differ, because it has to.",
          "Derived values are computed rather than picked. A muted text colour is a documented blend of two primitives, not a hex somebody eyedropped out of a mock. That one rule removes most categories of drift before governance has to do any work.",
        ],
      },
      {
        heading: "The operating model",
        body: [
          "A pipeline holds only if there are rules about who changes what, and when. I wrote an eighteen-artifact operating model covering the SDLC pipeline, a RACI matrix, the design tokens themselves, the handoff schema, and Definition of Ready and Definition of Done checklists.",
          "Ready means the states are specified, the tokens exist, the accessibility behaviour is agreed and there is a named owner. Done means it is built, documented, covered for keyboard and screen reader, and the old implementations are gone. Half-migrations are how design systems die, so Done has to include the deletion.",
          "New values do not enter the system by being used. They enter by being proposed, named and documented - and the review asks first whether an existing token already covers the case, because most of the time one does.",
        ],
      },
      {
        heading: "Governance",
        body: [
          "The design repository runs under branch protection with mandatory reviewer approval, so no change reaches the shared layer without a second pair of eyes. That is unremarkable for production code and still surprisingly rare for design sources, which is exactly why they drift.",
          "I also introduced structured AI-assisted workflows with per-directory rules and agent configuration. The point is not speed. It is that an assistant working in the token directory is bound by the same constraints as a person working there - the rules live next to the code they govern, so they apply whoever or whatever is editing.",
        ],
      },
      {
        heading: "What I would do differently",
        body: [
          "I shipped the token pipeline before the contribution process was written down, and spent the following weeks arbitrating decisions that a one-page document would have settled. The technical half is the easy half. The governance is what survives contact with a deadline.",
        ],
      },
    ],
    outcomes: [
      "One shared token layer serving five products across two frameworks.",
      "An 18-artifact operating model: SDLC pipeline, RACI, tokens, handoff schema, DoR and DoD.",
      "Branch protection and mandatory review on the design repository.",
      "32-35 pages re-themed in seven working days with a three-person team.",
      "Appointed Frontend Ambassador with formal KPIs for knowledge sharing and mentoring.",
    ],
  },
  {
    slug: "re-theme-sprint",
    index: "02",
    title: "The re-theme sprint",
    summary:
      "32 to 35 pages re-themed in seven working days with a three-person team - a delivery problem that the token layer turned into a configuration problem, and a retrospective that found the next thing to fix.",
    tags: ["Delivery", "Design tokens", "Leading a team", "Retrospective"],
    meta: {
      role: "Frontend lead",
      period: "Seven working days",
      surface: "Marketing site, 32-35 pages",
      stack: "Design tokens, Angular, Spartan",
    },
    sections: [
      {
        heading: "The constraint",
        body: [
          "A full site re-theme: 32 to 35 pages, seven working days, three frontend engineers including me. The number of pages was fixed, the deadline was fixed, and the only variable left was how much of the work was bespoke.",
          "That is the situation a design system either earns its keep in or does not. A re-theme is the purest test of one, because it asks a single question: how many of these pages have opinions of their own?",
        ],
      },
      {
        heading: "Why it was possible",
        figure: "themeSwap",
        body: [
          "Most of it was not page work. The theme change moved through the token layer, so pages that consumed tokens rather than local values inherited the new theme without being touched. The engineering effort concentrated on the exceptions.",
          "This is the argument for doing the unglamorous token work in the quiet months. Nobody asks for a token pipeline. They ask for 35 pages in a week, and the pipeline is the only reason that is a sentence you can say yes to.",
        ],
      },
      {
        heading: "Leading it",
        body: [
          "Three people over seven days does not leave room for rework, so the sequencing mattered more than the speed. The exceptions - the pages carrying their own values - were the long pole, and they needed to be found on day one rather than discovered on day five.",
          "I ran the retrospective at the end, which I think matters more than the delivery. A sprint that hits its date and teaches you nothing has only paid you once.",
        ],
      },
      {
        heading: "What the retrospective found",
        body: [
          "The highest-leverage remaining improvement was design token alignment. The places where the design source and the production stack had not yet fully converged were precisely the places that cost us days - the exceptions were not random, they were a map of where the system was still incomplete.",
          "That finding set the priority for the following quarter. It is also the reason I now treat alignment gaps as scheduled work rather than as something to get to: they are invisible until a deadline makes them expensive, and then they are the only thing that matters.",
        ],
      },
    ],
    outcomes: [
      "32 to 35 pages re-themed in seven working days.",
      "Three-person frontend team, led end to end.",
      "Retrospective run, with design token alignment identified as the next priority.",
    ],
  },
  {
    slug: "component-library",
    index: "03",
    title: "Component library",
    summary:
      "The primitives this site is built from, documented from the same source that renders them - every state, every token value, and the contrast each one is required to meet.",
    tags: ["Components", "Documentation", "Accessibility"],
    meta: {
      role: "Design systems engineer",
      period: "Ongoing",
      surface: "Library, documentation",
      stack: "React, TypeScript, CSS custom properties",
    },
    specimen: { href: "/components", label: "Open the live library" },
    sections: [
      {
        heading: "One implementation, not two",
        body: [
          "The documentation page imports the same components the site uses. There is no parallel copy kept in sync by hand, which means the documentation cannot quietly go stale - if a component changes, its specimen changes with it.",
          "Every state a component can be in is on the page: hover, focus, active, disabled, loading, invalid. States that only exist in a designer's head get implemented differently by every engineer who meets them.",
        ],
      },
      {
        heading: "Contrast is solved, not chosen",
        body: [
          "Each semantic role declares what it is for - text, fill, line, mark or surface - and that declaration decides how it is checked. Roles that carry text are generated by blending toward ink or paper until they clear 4.5:1 against their own background, stopping the moment they pass.",
          "The build then re-checks every role in both schemes and exits non-zero if one fails, so a primitive cannot be edited into an inaccessible pair without the build saying so. The resulting ratios and their derivations are published in the library's colour table, next to the values themselves.",
        ],
      },
      {
        heading: "Token values are exposed",
        body: [
          "Each specimen lists the tokens it consumes. That is partly documentation and partly a design constraint: a component that needs a value with no token name is a component that has not been designed yet.",
        ],
      },
    ],
    outcomes: [
      "Documented states for every interactive primitive.",
      "No second implementation to keep in sync.",
      "Contrast enforced at build time, in both colour schemes.",
      "The published token distribution is a real file you can open.",
    ],
  },
];

/* -------------------------------------------------------------- practice -- */

export const practice = {
  intro:
    "A design system is mostly an agreement, and agreements need maintenance. This is how I run mine.",
  items: [
    {
      title: "One source, many artefacts",
      body: "Values live in one file. Everything else - CSS, types, the JSON distribution, the design library - is generated from it. If a value can be edited in two places, it will eventually differ in two places.",
    },
    {
      title: "Share the contract, not the component",
      body: "Across two frameworks you cannot share implementations, so the shared layer has to be the tokens, the naming and the component contract. Get that right and the renderings are allowed to differ, because they have to.",
    },
    {
      title: "Naming before building",
      body: "A component with no name for its variants has no variants, only special cases. I settle the vocabulary with design first, because the names end up in the code, the Figma layers and the conversation, and renaming later is the expensive part.",
    },
    {
      title: "Definition of ready, definition of done",
      body: "Ready: states specified, tokens exist, accessibility behaviour agreed, a named owner. Done: built, documented, covered for keyboard and screen reader, and the old implementations deleted. Half-migrations are how systems die.",
    },
    {
      title: "Governance that fits on a page",
      body: "Who owns which layer, what needs review, how breaking changes are versioned and announced. Branch protection and mandatory approval on the design source, not just on production code. If the process is longer than a page, nobody reads it, and a process nobody reads is not governance.",
    },
    {
      title: "Contribution over gatekeeping",
      body: "A system nobody can add to gets routed around. There is a path in for a product engineer with a real need: propose, review against existing tokens, document, ship. The review asks whether the case is already covered, not whether the requester is senior enough.",
    },
  ],
};

/**
 * The leading half, stated as things that happened rather than things I
 * believe. The principles above are cheap to assert; these are checkable.
 */
export const leading = {
  heading: "Leading",
  intro: "What that looks like in practice, at Exelia.",
  items: [
    "Frontend Ambassador, with formal KPIs across knowledge sharing and mentoring.",
    "Led a three-person frontend team through a seven-day re-theme sprint, and ran the retrospective.",
    "Wrote the onboarding documentation, with separate tracks for general staff and for developers.",
    "Introduced branch protection and mandatory reviewer approval on the design repository.",
  ],
};

/* ------------------------------------------------------------ experience -- */

export type Role = {
  role: string;
  org: string;
  where: string;
  when: string;
  current?: boolean;
  summary?: string;
  notes: readonly string[];
  stack?: string;
};

export const experience: readonly Role[] = [
  {
    role: "Frontend developer - design systems and frontend lead",
    org: "Exelia Technologies",
    where: "Remote, Cyprus-based",
    when: "Mar 2024 - present",
    current: true,
    summary:
      "Leading frontend and design system work across a five-product suite.",
    notes: [
      "Designed and implemented a design-to-development pipeline connecting a React, Untitled UI and Storybook design repository to an Angular and Spartan production stack, with shared design tokens and a component library bridging the two.",
      "Built an 18-artifact operating model covering the SDLC pipeline, RACI matrix, design tokens, handoff schema and Definition of Ready / Definition of Done checklists.",
      "Introduced governance for the design repository: branch protection, mandatory reviewer approval, and structured AI-assisted workflows with per-directory rules and agent configuration.",
      "Led a website re-theme sprint delivering 32 to 35 pages in seven working days with a three-person frontend team, then ran the retrospective and identified design token alignment as the highest-leverage improvement.",
      "Appointed Frontend Ambassador with formal KPIs across knowledge sharing and mentoring.",
      "Built onboarding documentation with separate tracks for general staff and developers.",
    ],
    stack: "Angular, Spartan, React, React Native, TypeScript, Untitled UI, Storybook, Tailwind, Figma, GitHub Actions",
  },
  {
    role: "Frontend developer",
    org: "Dotslash Digital",
    where: "Remote",
    when: "Apr 2022 - Mar 2024",
    notes: [
      "Built a responsive marketing site optimised for desktop and mobile, increasing user engagement by 27%.",
      "Reduced page load times by 32% through caching and minification.",
      "Implemented a GraphQL and Apollo data-fetching layer.",
    ],
    stack: "React Native, GraphQL, Apollo",
  },
  {
    role: "Full stack developer",
    org: "Achuzi",
    where: "Remote",
    when: "Jan 2019 - Mar 2022",
    notes: [
      "Delivered a responsive application with a consistent experience across devices.",
      "Developed a real-time messaging system that increased user engagement by 18%.",
      "Designed a RESTful API for third-party integration, backed by a NoSQL data store.",
    ],
  },
  {
    role: "Freelance and consulting",
    org: "Various clients",
    where: "South Africa",
    when: "Jan 2014 - Dec 2018",
    notes: [
      "Web development and design for Dischem, G-Core Technologies, Yane Resources, Blue Stone Solutions, Chrome Supplements and Philly's Corner Pub.",
    ],
  },
];

export const skills = [
  { group: "Frontend", items: "TypeScript, React, Next.js, Angular, Vue, Tailwind CSS" },
  {
    group: "Design systems",
    items:
      "Design tokens, component libraries, Storybook, Untitled UI, Spartan, Figma, design-to-code handoff",
  },
  { group: "Mobile", items: "React Native" },
  { group: "Backend", items: "Node.js, GraphQL and Apollo, REST APIs, SQL, NoSQL" },
  { group: "Cloud", items: "AWS, Azure" },
  { group: "Practice", items: "Git, CI/CD, code review governance, technical documentation, mentoring" },
];

export const certifications = [
  { name: "Frontend Developer", issuer: "Meta" },
  { name: "UX Design", issuer: "Google" },
  { name: "Solutions Architect Associate", issuer: "AWS" },
  { name: "Developer Associate", issuer: "AWS" },
  { name: "Cloud Practitioner", issuer: "AWS" },
  { name: "Azure Fundamentals", issuer: "Microsoft" },
  { name: "Azure AI Fundamentals", issuer: "Microsoft" },
  { name: "Azure Data Fundamentals", issuer: "Microsoft" },
  { name: "Microsoft 365 Fundamentals", issuer: "Microsoft" },
  { name: "Security and Compliance", issuer: "Microsoft" },
];

export const languages = "English (native). Greek (proficient). Afrikaans (proficient).";

/* -------------------------------------------------------------- colophon -- */

/**
 * The site's own notes. This used to be a third case study, which made the
 * work section look padded - a portfolio about a portfolio is not evidence
 * of anything. It reads better as a colophon linked from the footer.
 */
export const colophon = {
  intro:
    "This site is built from its own design system, and annotates itself as you scroll. The notes below are how, and why.",
  sections: [
    {
      heading: "The argument",
      body: [
        "Every frontend portfolio is a hero, three cards and a gradient, and nobody hiring for design systems can tell them apart. This one is built as an annotated specimen instead, because that is what the job actually produces.",
        "The measurements in the margins are read from the spacing scale rather than typed in, so a mark cannot disagree with the thing it measures. The switches in the header turn the annotation layer off and reveal the 12-column grid it is measured against.",
      ],
    },
    {
      heading: "One source, several artefacts",
      body: [
        "A single token file generates the stylesheet, a typed module the components read, and a published JSON distribution linked from the footer. A hiring manager clicking through to the token source is a stronger signal than anything I could write about myself, so the source is one click away.",
        "Semantic roles that carry text are solved for contrast at build time - blended toward ink or paper until they clear 4.5:1 against their own background - and the build fails if any role misses the target its declared use demands.",
      ],
    },
    {
      heading: "Type and motion",
      body: [
        "The display face is Bricolage Grotesque, self-hosted as a variable font so the width axis is genuinely available: headlines compress as the viewport narrows instead of wrapping into a ragged stack. Sizes step between fixed scale values at breakpoints rather than interpolating off-scale.",
        "There is one orchestrated moment - the annotation marks draw themselves in over two seconds on first load, then settle. After that, motion only answers actions, and prefers-reduced-motion turns it off entirely.",
      ],
    },
    {
      heading: "Built with",
      body: [
        "Next.js as a static export, TypeScript, and CSS custom properties with no utility framework. The annotation layer needs no JavaScript to be correct - the boot script only adds the draw-in and restores your theme before first paint.",
      ],
    },
  ],
};

/* ----------------------------------------------------------------- about -- */

/**
 * The first paragraph doubles as the CV's background section, so it has to
 * stand on its own.
 */
export const about = {
  paragraphs: [
    "Football was the plan until an injury ended it, so I brought the same discipline to the web. I am self-taught, and twelve years in, the habit that taught me the craft is the one I lead with: go straight to the part of a system nobody fully understands, make it legible, and leave it in a state the whole team can own.",
    "What held my attention was never making something appear on a screen. It was the layer underneath - why two buttons that should be identical are not, and what it takes to make that impossible rather than merely unlikely. That question turned into the work I do now.",
    "At Exelia Technologies I lead that layer for a whole product suite: one token source and component library bridging a React design repository and an Angular production stack, and the 18-artifact operating model and review governance that keep the two from drifting. As the company's Frontend Ambassador I mentor the people who build on it, because a system only holds when everyone using it understands why it exists.",
    "The work I am proudest of is mostly invisible. It is the token that stopped a colour drifting across five products, the checklist that stopped a component shipping half-migrated, the one-page document that settled an argument before it started. A design system is an agreement, and someone has to keep it.",
    "Greek and South African, based in Cape Town, and an EU citizen. I already work remotely with a team in Cyprus, so European hours and distributed collaboration are part of every week.",
  ],
};

/* --------------------------------------------------------------- contact -- */

export const contact = {
  intro:
    "Open to design systems and frontend leadership roles, remote or in the EU. The fastest way to reach me is email.",
  links: [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Phone", value: site.phone, href: site.phoneHref },
    { label: "LinkedIn", value: "in/mario-moshogiannis", href: site.linkedin },
    { label: "CV", value: "Read it here", href: "/cv" },
  ],
};
