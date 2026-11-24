import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { getService, getServiceSlugs } from "@/sanity/lib/data";
import { ServiceCard } from "@/components/cards";
import { RichText } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { ServiceIcon } from "@/components/service-icon";
import { EnquiryCta } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { DetailSkeleton } from "@/components/skeletons";

const PLACEHOLDER = "__placeholder__";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return (slugs.length ? slugs : [PLACEHOLDER]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return service ? { title: service.title, description: service.summary ?? undefined } : {};
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }: Pick<PageProps<"/services/[slug]">, "params">) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="bg-navy-950 text-white">
        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
          <div className="animate-fade-up lg:col-span-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-300 transition-colors hover:text-white"
            >
              <ArrowLeft aria-hidden className="size-4" /> All services
            </Link>
            <span className="mt-10 flex size-14 items-center justify-center border border-white/15 text-teal-300">
              <ServiceIcon name={service.icon} className="size-6" />
            </span>
            <h1 className="mt-8 font-serif text-4xl leading-[1.08] font-medium tracking-tight text-balance md:text-6xl">
              {service.title}
            </h1>
            {service.summary && (
              <p className="mt-6 text-lg leading-relaxed text-navy-200 md:text-xl">{service.summary}</p>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-navy-800 lg:col-span-6">
            <SanityImage image={service.image} sizes="(min-width: 1024px) 50vw, 100vw" priority />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Eyebrow>Overview</Eyebrow>
            <div className="mt-8">
              <RichText value={service.body} />
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-navy-100 bg-navy-50 p-8 lg:sticky lg:top-28">
              {service.highlights && service.highlights.length > 0 && (
                <>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
                    What is included
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-navy-800">
                        <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-teal-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className={service.highlights?.length ? "mt-8 border-t border-navy-200 pt-8" : ""}>
                <p className="font-medium text-navy-950">Discuss this service with our team.</p>
                <ButtonLink href="/contact" className="mt-5 w-full">
                  Make an enquiry
                </ButtonLink>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {service.related && service.related.length > 0 && (
        <section className="bg-navy-50 py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Explore further" title="Related services" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.related.map((item) => (
                <ServiceCard key={item._id} service={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <EnquiryCta />
    </>
  );
}
