import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/layout/json-ld";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { projectSchema } from "@/lib/schema";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/portfolio/${slug}`,
    image: project.thumbnail,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectSchema(project)} />

      <section className="gallery-section pb-16 pt-28 sm:pt-32">
        <div className="gallery-container">
          <Link href="/portfolio" className="gallery-link mb-12">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-8 mb-8">
            <span className="gallery-label">{project.industry}</span>
            <span className="gallery-label">{project.projectType}</span>
          </div>
          <h1 className="gallery-heading max-w-4xl">{project.title}</h1>
          <p className="gallery-prose mt-8 max-w-3xl text-lg">{project.shortDescription}</p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-link mt-12"
          >
            Visit Live Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="pb-24">
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

      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <p className="gallery-label mb-8">Gallery</p>
          <div className="space-y-20">
            {(["desktop", "tablet", "mobile"] as const).map((device) => (
              project.gallery[device].length > 0 && (
                <div key={device}>
                  <h2 className="gallery-label mb-10 capitalize">{device}</h2>
                  <div className="grid gap-12 sm:grid-cols-2">
                    {project.gallery[device].map((img, i) => (
                      <div key={i} className="relative aspect-[16/10] overflow-hidden bg-stone-light">
                        <Image
                          src={img}
                          alt={`${project.title} ${device} screenshot ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
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
          <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
            <div>
              <p className="gallery-label mb-6">Challenge</p>
              <p className="gallery-prose">{project.challenge}</p>
            </div>
            <div>
              <p className="gallery-label mb-6">Solution</p>
              <p className="gallery-prose">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <p className="gallery-label mb-6">Stack</p>
          <p className="gallery-prose">{project.technologies.join(" · ")}</p>
        </div>
      </section>

      <section className="gallery-section pt-0">
        <div className="gallery-container">
          <p className="gallery-label mb-12">Results</p>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {project.results.map((result) => (
              <div key={result.label} className="flex flex-col gap-3">
                <p className="font-serif text-4xl tracking-[0.04em]">{result.value}</p>
                <p className="gallery-label">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section pt-0 text-center">
        <div className="gallery-container">
          <p className="gallery-label mb-6">Live</p>
          <h2 className="gallery-subheading">See It In Action</h2>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-link mt-10"
          >
            Visit Website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </>
  );
}
