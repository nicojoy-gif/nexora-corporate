import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SanityImage } from "./sanity-image";
import { ServiceIcon } from "./service-icon";
import { formatDate } from "@/lib/format";
import type { NewsCard as NewsCardType, ServiceCard as ServiceCardType } from "@/sanity/lib/types";

export function ServiceCard({ service, index }: { service: ServiceCardType; index?: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(8,19,38,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
        <SanityImage
          image={service.image}
          alt=""
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col border border-t-0 border-navy-100 p-7">
        <div className="flex items-center justify-between">
          <span className="flex size-11 items-center justify-center bg-navy-50 text-teal-700 transition-colors group-hover:bg-navy-900 group-hover:text-teal-300">
            <ServiceIcon name={service.icon} className="size-5" />
          </span>
          {typeof index === "number" && (
            <span className="font-mono text-xs text-navy-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-navy-950">{service.title}</h3>
        {service.summary && (
          <p className="mt-3 flex-1 leading-relaxed text-navy-600">{service.summary}</p>
        )}
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-teal-700">
          Explore service
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function NewsCard({ article, priority = false }: { article: NewsCardType; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/2] overflow-hidden bg-navy-100">
        <SanityImage
          image={article.image}
          alt=""
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-navy-500">
        {article.category && <span className="text-teal-700">{article.category}</span>}
        {article.category && article.publishedAt && <span aria-hidden>·</span>}
        {article.publishedAt && (
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        )}
      </div>
      <h3 className="mt-3 text-xl leading-snug font-semibold tracking-tight text-navy-950">
        <Link
          href={`/news/${article.slug}`}
          className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]"
        >
          <span aria-hidden className="absolute inset-0" />
          {article.title}
        </Link>
      </h3>
      {article.excerpt && (
        <p className="mt-3 line-clamp-3 leading-relaxed text-navy-600">{article.excerpt}</p>
      )}
    </article>
  );
}
