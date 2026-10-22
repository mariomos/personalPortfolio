import { Hero } from "@/components/sections/hero";
import { WorkIndex } from "@/components/sections/work-index";
import { LibraryTeaser } from "@/components/sections/library-teaser";
import { Practice } from "@/components/sections/practice";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkIndex />
      <LibraryTeaser />
      <Practice />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
