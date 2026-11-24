import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getNewsArticle, getNewsSlugs } from "@/sanity/lib/data";
import { NewsCard } from "@/components/cards";
import { RichText } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { DetailSkeleton } from "@/components/skeletons";
import { Container, SectionHeading } from "@/components/ui";
import { formatDate } from "@/lib/format";

const PLACEHOLDER = "__placeholder__";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return (slugs.length ? slugs : [PLACEHOLDER]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return article ? { title: article.title, description: article.excerpt ?? undefined } : {};
}

export default function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: Pick<PageProps<"/news/[slug]">, "params">) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  return (
    <>
      <article>
        <header className="pt-14 md:pt-20">
          <Container>
            <div className="mx-auto max-w-3xl animate-fade-up">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy-500 transition-colors hover:text-navy-950"
              >
                <ArrowLeft aria-hidden className="size-4" /> All news
              </Link>
              <p className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-navy-500">
                {article.category && <span className="text-teal-700">{article.category}</span>}
                {article.category && article.publishedAt && <span aria-hidden>·</span>}
                {article.publishedAt && (
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                )}
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-[1.1] font-medium tracking-tight text-balance text-navy-950 md:text-[3.5rem]">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="mt-6 text-xl leading-relaxed text-navy-600">{article.excerpt}</p>
              )}
            </div>
          </Container>
        </header>

        {article.image?.asset && (
          <Container className="mt-14">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-navy-100">
              <SanityImage image={article.image} sizes="(min-width: 1024px) 1024px, 100vw" priority />
            </div>
          </Container>
        )}

        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <RichText value={article.body} />
          </div>
        </Container>
      </article>

      {article.more && article.more.length > 0 && (
        <section className="border-t border-navy-100 bg-navy-50 py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Keep reading" title="More from Nexora" />
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {article.more.map((item) => (
                <NewsCard key={item._id} article={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
