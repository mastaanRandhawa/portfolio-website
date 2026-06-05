import { Hono } from "hono";
import { z } from "zod";
import { Resend } from "resend";
import { getSiteConfig } from "../lib/content.js";
import { checkRateLimit } from "../lib/rate-limit.js";
import {
  createContactSubmission,
  markContactEmailSent,
} from "../lib/contact-repository.js";
import type { Env } from "../config/env.js";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().min(1),
  projectType: z.string().min(1),
  message: z.string().min(10),
  website: z.string().max(0).optional(),
});

export function createContactRoutes(env: Env) {
  const contactRoutes = new Hono();

  contactRoutes.post("/api/contact", async (c) => {
    const ip =
      c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
      c.req.header("x-real-ip") ??
      "unknown";
    const rateLimitResult = await checkRateLimit(ip);

    if (!rateLimitResult.success) {
      return c.json({ error: "Too many requests. Please try again later." }, 429);
    }

    try {
      const body = await c.req.json();
      const data = contactSchema.parse(body);

      if (data.website) {
        return c.json({ success: true });
      }

      const submission = await createContactSubmission({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        budget: data.budget,
        projectType: data.projectType,
        message: data.message,
        ipAddress: ip,
      });

      const site = getSiteConfig();

      if (env.RESEND_API_KEY) {
        const resend = new Resend(env.RESEND_API_KEY);
        await resend.emails.send({
          from: env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
          to: site.contact.email,
          subject: `New inquiry from ${data.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
            <p><strong>Company:</strong> ${data.company || "N/A"}</p>
            <p><strong>Budget:</strong> ${data.budget}</p>
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>
          `,
        });
        await markContactEmailSent(submission.id);
      } else {
        console.log("Contact form submission (no RESEND_API_KEY):", data);
      }

      return c.json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: "Invalid form data", details: error.issues }, 400);
      }
      console.error("Contact form error:", error);
      return c.json({ error: "Failed to send message. Please try again." }, 500);
    }
  });

  return contactRoutes;
}
