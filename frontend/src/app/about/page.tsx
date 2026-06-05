import { PageHeader } from "@/components/layout/page-header";
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

          <div className="mt-16 sm:mt-28">
            <div className="gallery-section-intro">
              <p className="gallery-label mb-4 sm:mb-6">Expertise</p>
              <h2 className="gallery-subheading">Skills & Expertise</h2>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10">
              {(["frontend", "backend", "design"] as const).map((category) => (
                <div key={category} className="gallery-card-muted">
                  <h3 className="gallery-footer-heading capitalize">{category}</h3>
                  <ul className="divide-y divide-border/50 sm:divide-none sm:space-y-3">
                    {about.skills[category].map((skill) => (
                      <li key={skill} className="gallery-list-item">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
