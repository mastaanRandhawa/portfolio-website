import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const contactSubmissions = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@harborrealty.com",
    phone: "+1 (555) 234-8901",
    company: "Harbor Realty",
    budget: "10k-25k",
    projectType: "business-website",
    message:
      "We're a boutique real estate agency looking to refresh our online presence. We need property listings, agent profiles, and a contact funnel that integrates with our CRM.",
    ipAddress: "192.168.1.10",
    emailSent: true,
    createdAt: new Date("2026-05-01T14:30:00Z"),
  },
  {
    name: "Marcus Webb",
    email: "marcus@bistronova.co",
    company: "Bistro Nova",
    budget: "5k-10k",
    projectType: "landing-page",
    message:
      "Opening a new farm-to-table restaurant next month and need a landing page with our menu, hours, and online reservations. Something warm and inviting.",
    ipAddress: "192.168.1.11",
    emailSent: true,
    createdAt: new Date("2026-05-10T09:15:00Z"),
  },
  {
    name: "Elena Rodriguez",
    email: "elena@luxebeauty.studio",
    phone: "+1 (555) 876-5432",
    company: "Luxe Beauty Studio",
    budget: "25k-50k",
    projectType: "ecommerce",
    message:
      "We want to launch an e-commerce store for our skincare line with subscription options, gift sets, and a loyalty program. Currently selling only through Instagram DMs.",
    ipAddress: "192.168.1.12",
    emailSent: false,
    createdAt: new Date("2026-05-18T16:45:00Z"),
  },
  {
    name: "James Okonkwo",
    email: "james@buildright.co",
    company: "BuildRight Construction",
    budget: "10k-25k",
    projectType: "redesign",
    message:
      "Our current website is five years old and doesn't showcase our recent commercial projects. Looking for a full redesign with a project gallery and quote request form.",
    ipAddress: "192.168.1.13",
    emailSent: true,
    createdAt: new Date("2026-05-22T11:00:00Z"),
  },
  {
    name: "Priya Sharma",
    email: "priya@cloudmetrics.io",
    budget: "50k-plus",
    projectType: "web-app",
    message:
      "We're a B2B SaaS startup and need a marketing site plus a lightweight product demo environment. Happy to discuss scope on a call.",
    ipAddress: "192.168.1.14",
    emailSent: false,
    createdAt: new Date("2026-06-02T08:20:00Z"),
  },
];

async function main() {
  const existing = await prisma.contactSubmission.count();
  if (existing > 0) {
    console.log(
      `Skipping seed: ${existing} contact submission(s) already exist.`,
    );
    return;
  }

  await prisma.contactSubmission.createMany({ data: contactSubmissions });

  console.log(`Seeded ${contactSubmissions.length} contact submissions.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
