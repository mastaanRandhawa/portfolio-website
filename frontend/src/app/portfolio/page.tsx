import { PageHeader } from "@/components/layout/page-header";
import { PortfolioFilters } from "@/components/sections/portfolio-filters";
import { JsonLd } from "@/components/layout/json-ld";
import { getAllProjects, getSiteConfig } from "@/lib/content";
import { buildPageSchemaGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Portfolio",
    description:
      "Explore web design and development case studies from Doxa Studios — real projects across automotive, SaaS, hospitality, and more.",
    path: "/portfolio",
  });
}

export default function PortfolioPage() {
  const projects = getAllProjects();
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: "Our Portfolio",
          description: "Web design and development case studies from Doxa Studios.",
          path: "/portfolio",
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "Portfolio", path: "/portfolio" },
          ],
        })}
      />
      <PageHeader
        title="Our Portfolio"
        description="A showcase of websites and digital experiences we've crafted for businesses across industries."
      />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <PortfolioFilters projects={projects} />
        </div>
      </section>
    </>
  );
}
