import { PageHeader } from "@/components/layout/page-header";
import { SkillsSection } from "@/components/sections/skills-section";
import { fetchAboutContent } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "About",
    description: "Learn about our mission, experience, and the team behind Doxa Studios.",
    path: "/about",
  });
}

export default async function AboutPage() {
  const about = await fetchAboutContent();

  return (
    <>
      <PageHeader title="About Us" description={about.introduction} />
      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <div className="gallery-card-muted mb-16 grid grid-cols-2 gap-6 sm:mb-24 sm:grid-cols-3 sm:gap-12 lg:mb-32">
            {[
              { value: about.experience.years, label: "Years in Business" },
              { value: about.experience.projects, label: "Projects Completed" },
              { value: about.experience.industries, label: "Industries Served" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 sm:gap-3 last:col-span-2 last:sm:col-span-1">
                <p className="font-serif text-3xl tracking-[0.04em] min-[375px]:text-4xl sm:text-5xl">{stat.value}</p>
                <p className="gallery-label">{stat.label}</p>
              </div>
            ))}
          </div>

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

          <SkillsSection skills={about.skills} />
        </div>
      </section>
    </>
  );
}
