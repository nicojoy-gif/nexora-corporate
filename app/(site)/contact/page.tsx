import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { getSiteSettings } from "@/sanity/lib/data";
import { PageHero } from "@/components/sections";
import { Container, Eyebrow } from "@/components/ui";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nexora Corporate about a business or technology engagement.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const details: { icon: LucideIcon; label: string; value: string; href?: string }[] = [];
  if (settings?.contactEmail)
    details.push({ icon: Mail, label: "Email", value: settings.contactEmail, href: `mailto:${settings.contactEmail}` });
  if (settings?.phone)
    details.push({ icon: Phone, label: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^\d+]/g, "")}` });
  if (settings?.address) details.push({ icon: MapPin, label: "Office", value: settings.address });
  if (settings?.officeHours) details.push({ icon: Clock, label: "Office hours", value: settings.officeHours });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about the challenge you are working on."
        description="Share a few details and the right partner from our team will follow up to arrange an initial conversation."
      />

      <section className="py-20 md:py-28">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-tight font-medium text-navy-950">
              {settings?.companyName || "Nexora Corporate"}
            </h2>
            {details.length > 0 ? (
              <dl className="mt-10 divide-y divide-navy-100 border-y border-navy-100">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4 py-6">
                    <span className="flex size-10 shrink-0 items-center justify-center bg-navy-50 text-teal-700">
                      <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">{label}</dt>
                      <dd className="mt-1.5 whitespace-pre-line text-navy-900">
                        {href ? (
                          <a href={href} className="hover:text-teal-700">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-navy-600">
                Contact details can be added under Site Settings in the Studio.
              </p>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="border border-navy-100 p-6 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-navy-950">Business enquiry</h2>
              <p className="mt-2 mb-8 text-navy-600">All fields are required unless marked optional.</p>
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
