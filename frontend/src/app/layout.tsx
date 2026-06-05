import type { Metadata } from "next";
import { Open_Sans, Urbanist } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/layout/analytics";
import { JsonLd } from "@/components/layout/json-ld";
import { fetchSiteConfig } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await fetchSiteConfig();

  return (
    <html
      lang="en"
      className={`${openSans.variable} ${urbanist.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <JsonLd data={[organizationSchema(site), websiteSchema(site)]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground"
        >
          Skip to content
        </a>
        <Header siteName={site.name} />
        <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>
        <Footer site={site} />
        <Analytics />
      </body>
    </html>
  );
}
