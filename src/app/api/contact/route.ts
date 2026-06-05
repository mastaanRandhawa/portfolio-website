import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSiteConfig } from "@/lib/content";

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

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateLimitResult = checkRateLimit(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const site = getSiteConfig();
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
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
    } else {
      console.log("Contact form submission (no RESEND_API_KEY):", data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
