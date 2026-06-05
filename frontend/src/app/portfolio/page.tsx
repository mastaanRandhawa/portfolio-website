import { PageHeader } from "@/components/layout/page-header";
import { PortfolioFilters } from "@/components/sections/portfolio-filters";
import { fetchAllProjects } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Portfolio",
    description: "Explore our completed web design and development projects across industries.",
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const projects = await fetchAllProjects();

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
