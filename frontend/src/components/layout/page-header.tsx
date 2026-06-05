interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="gallery-section pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="gallery-container">
        <p className="gallery-label mb-6">Overview</p>
        <h1 className="gallery-heading max-w-4xl">{title}</h1>
        {description && (
          <p className="gallery-prose mt-8 max-w-2xl text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
