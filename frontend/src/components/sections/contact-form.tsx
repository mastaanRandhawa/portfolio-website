"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const fieldClass = "gallery-field";
const selectClass = cn(
  fieldClass,
  "w-full justify-between gap-4 focus-visible:ring-0 data-[size=default]:h-auto"
);
const selectContentClass =
  "rounded-none border border-border/50 bg-background shadow-none ring-0";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-destructive">
      {message}
    </p>
  );
}

interface ContactFormProps {
  contactEmail: string;
}

export function ContactForm({ contactEmail }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Project inquiry from ${data.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "N/A"}`,
        `Company: ${data.company || "N/A"}`,
        `Budget: ${data.budget}`,
        `Project Type: ${data.projectType}`,
        "",
        data.message,
      ].join("\n"),
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus("success");
    reset();
  };

  if (status === "success") {
    return (
      <div className="py-12 sm:py-16">
        <p className="gallery-label">Received</p>
        <h3 className="gallery-subheading mt-6">Thank you</h3>
        <p className="gallery-prose mt-8 max-w-md">
          Your email client should open with your message ready to send. If it didn&apos;t open,
          email us directly at{" "}
          <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
            {contactEmail}
          </a>
          .
        </p>
        <Button className="mt-14" variant="outline" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 sm:space-y-14 lg:space-y-16" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input id="website" tabIndex={-1} autoComplete="off" className={fieldClass} {...register("website")} />
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-14 lg:gap-16">
        <div className="gallery-form-group">
          <Label htmlFor="name" className="gallery-label">
            Name *
          </Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={fieldClass}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="gallery-form-group">
          <Label htmlFor="email" className="gallery-label">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={fieldClass}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-14 lg:gap-16">
        <div className="gallery-form-group">
          <Label htmlFor="phone" className="gallery-label">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            {...register("phone")}
          />
        </div>
        <div className="gallery-form-group">
          <Label htmlFor="company" className="gallery-label">
            Company
          </Label>
          <Input
            id="company"
            autoComplete="organization"
            className={fieldClass}
            {...register("company")}
          />
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-14 lg:gap-16">
        <div className="gallery-form-group">
          <Label htmlFor="budget" className="gallery-label">
            Budget *
          </Label>
          <Select onValueChange={(v) => setValue("budget", v as string)}>
            <SelectTrigger id="budget" aria-invalid={!!errors.budget} className={selectClass}>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="under-5k">Under $5,000</SelectItem>
              <SelectItem value="5k-10k">$5,000 – $10,000</SelectItem>
              <SelectItem value="10k-25k">$10,000 – $25,000</SelectItem>
              <SelectItem value="25k-50k">$25,000 – $50,000</SelectItem>
              <SelectItem value="50k-plus">$50,000+</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.budget?.message} />
        </div>
        <div className="gallery-form-group">
          <Label htmlFor="projectType" className="gallery-label">
            Project Type *
          </Label>
          <Select onValueChange={(v) => setValue("projectType", v as string)}>
            <SelectTrigger id="projectType" aria-invalid={!!errors.projectType} className={selectClass}>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="business-website">Business Website</SelectItem>
              <SelectItem value="landing-page">Landing Page</SelectItem>
              <SelectItem value="ecommerce">E-Commerce</SelectItem>
              <SelectItem value="web-app">Web App</SelectItem>
              <SelectItem value="redesign">Website Redesign</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FieldError message={errors.projectType?.message} />
        </div>
      </div>

      <div className="gallery-form-group">
        <Label htmlFor="message" className="gallery-label">
          Message *
        </Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          className={cn(fieldClass, "gallery-field-textarea")}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <div className="pt-2 sm:pt-4">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Send Message
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
