export function CalendlyEmbed() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!calendlyUrl) {
    return (
      <div className="py-20 text-center">
        <h3 className="gallery-subheading">Scheduling Coming Soon</h3>
        <p className="gallery-prose mx-auto mt-4 max-w-md">
          Online booking is being set up. In the meantime, please{" "}
          <a href="/contact" className="underline underline-offset-4 hover:opacity-60">
            contact us
          </a>{" "}
          to schedule a consultation.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <iframe
        src={calendlyUrl}
        title="Book a consultation"
        width="100%"
        height="700"
        className="min-h-[520px] w-full border-0 sm:min-h-[600px] lg:min-h-[700px]"
        loading="lazy"
      />
    </div>
  );
}
