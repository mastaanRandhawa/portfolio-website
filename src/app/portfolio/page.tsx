import { PageHeader } from "@/components/layout/page-header";
import { PortfolioFilters } from "@/components/sections/portfolio-filters";
import { getAllProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portfolio",
  description: "Explore our completed web design and development projects across industries.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <>
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
