interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="pb-8 pt-24 sm:pb-10 sm:pt-28 md:pt-32">
      <div className="gallery-container">
        <p className="gallery-label mb-4 sm:mb-6">Overview</p>
        <h1 className="gallery-heading max-w-4xl text-balance">{title}</h1>
        {description && (
          <p className="gallery-prose mt-6 max-w-2xl text-base sm:mt-8 sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
