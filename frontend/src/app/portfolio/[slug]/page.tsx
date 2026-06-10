import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/layout/json-ld";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
  getSiteConfig,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { buildPageSchemaGraph, projectSchema } from "@/lib/schema";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return buildMetadata({ title: "Project Not Found", path: `/portfolio/${slug}`, noIndex: true });
  }

  return buildMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/portfolio/${slug}`,
    image: project.thumbnail,
    openGraphType: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const site = getSiteConfig();
  const allProjects = getAllProjects();
  if (!project) notFound();

  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug && p.industry === project.industry)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={buildPageSchemaGraph(site, {
          name: project.title,
          description: project.shortDescription,
          path: `/portfolio/${slug}`,
          breadcrumbs: [
            { name: "Home", path: "" },
            { name: "Portfolio", path: "/portfolio" },
            { name: project.title, path: `/portfolio/${slug}` },
          ],
          extra: [projectSchema(project, site)],
        })}
      />

      <section className="gallery-section pb-12 pt-24 sm:pb-16 sm:pt-28 md:pt-32">
        <div className="gallery-container">
          <Link href="/portfolio" className="gallery-link mb-8 sm:mb-12">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>
          <div className="mb-6 flex flex-wrap gap-4 sm:mb-8 sm:gap-8">
            <span className="gallery-label">{project.industry}</span>
            <span className="gallery-label">{project.projectType}</span>
          </div>
          <h1 className="gallery-heading max-w-4xl">{project.title}</h1>
          <p className="gallery-prose mt-6 max-w-3xl text-base sm:mt-8 sm:text-lg">{project.shortDescription}</p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-link mt-8 sm:mt-12"
          >
            Visit Live Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="gallery-container">
          <div className="relative aspect-[16/9] overflow-hidden bg-stone-light">
            <Image
              src={project.thumbnail}
              alt={`${project.title} main screenshot`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {project.overview && (
        <section className="gallery-section pt-0">
          <div className="gallery-container max-w-3xl">
            <h2 className="gallery-label mb-6">Overview</h2>
            <div className="gallery-prose space-y-4">
              {project.overview.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <p className="gallery-label mb-8">Gallery</p>
          <div className="space-y-12 sm:space-y-20">
            {(["desktop", "tablet", "mobile"] as const).map((device) => (
              project.gallery[device].length > 0 && (
                <div key={device}>
                  <h2 className="gallery-label mb-6 capitalize sm:mb-10">{device}</h2>
                  <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
                    {project.gallery[device].map((img, i) => (
                      <div key={i} className="relative aspect-[16/10] overflow-hidden bg-stone-light">
                        <Image
                          src={img}
                          alt={`${project.title} ${device} screenshot ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="gallery-container">
          <div className="border border-foreground/30">
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-foreground/30 p-6 sm:p-8 lg:border-r lg:border-b-0">
                <p className="gallery-label mb-4 sm:mb-6">Challenge</p>
                <p className="gallery-prose">{project.challenge}</p>
              </div>
              <div className="p-6 sm:p-8">
                <p className="gallery-label mb-4 sm:mb-6">Solution</p>
                <p className="gallery-prose">{project.solution}</p>
              </div>
            </div>
            <div className="border-t border-foreground/30 p-6 sm:p-8">
              <p className="gallery-label mb-4 sm:mb-6">Stack</p>
              <p className="gallery-prose">{project.technologies.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <div className="border border-foreground/30 p-6 sm:p-8">
            <p className="gallery-label mb-8 sm:mb-10">Results</p>
            <div className="grid grid-cols-2 border-t border-l border-foreground/30 lg:grid-cols-4">
              {project.results.map((result) => (
                <div
                  key={result.label}
                  className="flex flex-col gap-2 border-r border-b border-foreground/30 p-5 sm:gap-3 sm:p-6 lg:p-8"
                >
                  <p className="font-serif text-3xl tracking-[0.04em] min-[375px]:text-4xl">
                    {result.value}
                  </p>
                  <p className="gallery-label">{result.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="gallery-section pt-0">
          <div className="gallery-container">
            <h2 className="gallery-label mb-6">Related Projects</h2>
            <ul className="space-y-4">
              {relatedProjects.map((related) => (
                <li key={related.slug}>
                  <Link href={`/portfolio/${related.slug}`} className="gallery-link">
                    {related.title}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pt-16 pb-0 sm:pt-24 lg:pt-32" aria-labelledby="project-live-heading">
        <div className="w-full bg-charcoal px-4 py-16 text-center sm:px-8 sm:py-24 md:px-16 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="gallery-label mb-6 text-red-500 sm:mb-8">Live</p>
            <h2
              id="project-live-heading"
              className="font-serif text-[1.625rem] font-normal tracking-[0.04em] text-off-white text-balance min-[375px]:text-3xl sm:text-4xl md:text-5xl"
            >
              See It In Action
            </h2>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-11 items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-off-white underline-offset-[6px] transition-[color,opacity] duration-300 ease-out hover:text-off-white/70 sm:mt-12"
            >
              Visit Website
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
