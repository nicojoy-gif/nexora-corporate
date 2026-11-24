import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNewsList } from "@/sanity/lib/data";
import { NewsCard } from "@/components/cards";
import { SanityImage } from "@/components/sanity-image";
import { PageHero } from "@/components/sections";
import { Container, EmptyState } from "@/components/ui";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "Company news, case studies and perspectives on business and technology in Africa.",
};

export default async function NewsPage() {
  const articles = await getNewsList();
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="News & insights"
        title="Perspectives on business, technology and growth across Africa."
      />

      <section className="py-20 md:py-28">
        <Container>
          {!lead && (
            <EmptyState title="No news articles published yet.">
              Create a News Article in the Studio and publish it to list it here.
            </EmptyState>
          )}

          {lead && (
            <article className="group relative grid gap-10 border-b border-navy-100 pb-16 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-100 lg:col-span-7">
                <SanityImage
                  image={lead.image}
                  alt=""
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="lg:col-span-5">
                <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-navy-500">
                  <span className="text-teal-700">{lead.category || "Latest"}</span>
                  {lead.publishedAt && (
                    <>
                      <span aria-hidden>·</span>
                      <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>
                    </>
                  )}
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight font-medium tracking-tight text-balance text-navy-950 md:text-4xl">
                  <Link href={`/news/${lead.slug}`}>
                    <span aria-hidden className="absolute inset-0" />
                    {lead.title}
                  </Link>
                </h2>
                {lead.excerpt && (
                  <p className="mt-5 text-lg leading-relaxed text-navy-600">{lead.excerpt}</p>
                )}
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 group-hover:text-teal-700">
                  Read article
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <NewsCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
