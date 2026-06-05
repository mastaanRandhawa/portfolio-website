import { prisma } from "./prisma.js";

export interface ContactSubmissionInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget: string;
  projectType: string;
  message: string;
  ipAddress?: string;
}

export async function createContactSubmission(data: ContactSubmissionInput) {
  return prisma.contactSubmission.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      budget: data.budget,
      projectType: data.projectType,
      message: data.message,
      ipAddress: data.ipAddress,
    },
  });
}

export async function markContactEmailSent(id: string) {
  return prisma.contactSubmission.update({
    where: { id },
    data: { emailSent: true },
  });
}
