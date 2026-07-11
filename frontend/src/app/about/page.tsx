import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SkillsSection } from "@/components/sections/skills-section";
import { JsonLd } from "@/components/layout/json-ld";
import { getAboutContent, getSiteConfig } from "@/lib/content";
import { buildPageSchemaGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "About",
    description:
      "Learn about Doxa Studios — a Vancouver web design and development studio delivering fast, high-performance websites.",
    path: "/about",
  });
}

export default function AboutPage() {
  const about = getAboutContent();
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: "About Us",
          description: about.introduction,
          path: "/about",
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "About", path: "/about" },
          ],
        })}
      />
      <PageHeader title="About Us" description={about.introduction} />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <div className="gallery-section-intro max-w-3xl">
            <p className="gallery-label mb-4 sm:mb-6">{about.mission.title}</p>
            <h2 className="gallery-subheading">{about.mission.statement}</h2>
          </div>

          <div className="mt-12 grid gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12">
            {about.mission.values.map((value) => (
              <div key={value.title} className="gallery-card flex flex-col gap-3 sm:gap-4">
                <h3 className="gallery-item-title">{value.title}</h3>
                <p className="gallery-prose text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-foreground/20 p-6 sm:mt-24 sm:p-8">
            <h2 className="gallery-subheading">Why Clients Trust Us</h2>
            <p className="gallery-prose mt-4 max-w-3xl">
              Based in Vancouver, BC, we serve businesses across Canada with transparent communication,
              measurable results, and websites engineered for Core Web Vitals and search visibility.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/portfolio" className="gallery-link">
                View Our Work
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/services" className="gallery-link">
                Explore Services
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/process" className="gallery-link">
                Our Process
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <SkillsSection skills={about.skills} />
        </div>
      </section>
    </>
  );
}
