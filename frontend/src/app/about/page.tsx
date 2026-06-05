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
          <div className="mb-20 grid grid-cols-2 gap-8 sm:mb-32 sm:grid-cols-3 sm:gap-16">
            {[
              { value: about.experience.years, label: "Years in Business" },
              { value: about.experience.projects, label: "Projects Completed" },
              { value: about.experience.industries, label: "Industries Served" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3 sm:gap-4 last:col-span-2 last:sm:col-span-1">
                <p className="font-serif text-4xl tracking-[0.04em] sm:text-5xl">{stat.value}</p>
                <p className="gallery-label">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl">
            <p className="gallery-label mb-6">{about.mission.title}</p>
            <h2 className="gallery-subheading">{about.mission.statement}</h2>
          </div>

          <div className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
            {about.mission.values.map((value) => (
              <div key={value.title} className="flex flex-col gap-5">
                <h3 className="font-serif text-xl tracking-[0.03em]">{value.title}</h3>
                <p className="gallery-prose text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 sm:mt-32">
            <p className="gallery-label mb-6">Expertise</p>
            <h2 className="gallery-subheading mb-10 sm:mb-16">Skills & Expertise</h2>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
              {(["frontend", "backend", "design"] as const).map((category) => (
                <div key={category}>
                  <h3 className="gallery-label mb-6 normal-case tracking-[0.14em]">{category}</h3>
                  <ul className="space-y-3">
                    {about.skills[category].map((skill) => (
                      <li key={skill} className="gallery-prose text-sm">{skill}</li>
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
