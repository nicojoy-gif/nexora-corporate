import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { getServices, getSiteSettings } from "@/sanity/lib/data";
import { Logo } from "./site-header";
import { NAV_ITEMS } from "@/lib/navigation";
import { Container } from "./ui";

export async function SiteFooter() {
  "use cache";
  cacheLife("minutes");

  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const companyName = settings?.companyName || "Nexora Corporate";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      <Container className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo name={companyName} light />
          {settings?.tagline && (
            <p className="mt-6 max-w-sm leading-relaxed text-navy-300">{settings.tagline}</p>
          )}
          {settings?.socialLinks && settings.socialLinks.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {settings.socialLinks.map((link) => (
                <li key={link._key}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-teal-300"
                  >
                    {link.platform}
                    <ArrowUpRight aria-hidden className="size-3.5 opacity-60 group-hover:opacity-100" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterColumn title="Company" className="lg:col-span-2">
          {[...NAV_ITEMS.slice(1), { href: "/contact", label: "Contact" }].map((item) => (
            <li key={item.href}>
              <FooterLink href={item.href}>{item.label}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Services" className="lg:col-span-3">
          {services.slice(0, 5).map((service) => (
            <li key={service._id}>
              <FooterLink href={`/services/${service.slug}`}>{service.title}</FooterLink>
            </li>
          ))}
          {services.length === 0 && (
            <li>
              <FooterLink href="/services">All services</FooterLink>
            </li>
          )}
        </FooterColumn>

        <FooterColumn title="Contact" className="lg:col-span-3">
          {settings?.address && (
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-400" />
              <span className="whitespace-pre-line">{settings.address}</span>
            </li>
          )}
          {settings?.phone && (
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-400" />
              <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            </li>
          )}
          {settings?.contactEmail && (
            <li className="flex gap-3">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-400" />
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-white">
                {settings.contactEmail}
              </a>
            </li>
          )}
        </FooterColumn>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {companyName}. All rights reserved.
          </p>
          <p>A fictional company created for demonstration purposes.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">{title}</h2>
      <ul className="mt-6 space-y-3.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="transition-colors hover:text-white">
      {children}
    </Link>
  );
}
