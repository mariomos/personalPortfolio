import { contact, isTodo } from "@/lib/content";
import { Section } from "@/components/section";
import { Placeholder } from "@/components/placeholder";

/**
 * Links, not a form. The site is a static export, so a form would need a
 * third party to be honest about working - and the brief's first option was
 * no form at all. actions/sendEmail.ts is still in the repo if that changes.
 */
export function Contact() {
  return (
    <Section id="contact" index="06" name="contact" order={7}>
      <h2 className="display-l section__title">Contact</h2>
      <p className="section__intro">{contact.intro}</p>

      <div className="contact-list" style={{ marginTop: "var(--space-8)" }}>
        {contact.links.map((link) => {
          if (isTodo(link.href) || isTodo(link.value)) {
            return (
              <div key={link.label} style={{ paddingBlock: "var(--space-4)" }}>
                <Placeholder
                  note={`${link.label} - ${
                    isTodo(link.href) ? link.href.__todo : String(link.value)
                  }`}
                />
              </div>
            );
          }
          const href = link.href as string;
          const external = href.startsWith("http");
          return (
            <a
              key={link.label}
              className="contact-row"
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span>{link.label}</span>
              <span className="contact-row__value">{link.value as string}</span>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
