import Link from "next/link";
import { Suspense } from "react";
import { getSiteSettings } from "@/sanity/lib/data";
import { SiteNav, SiteNavFallback } from "./site-nav";
import { Container } from "./ui";

export function Logo({ name, light = false }: { name: string; light?: boolean }) {
  const [first, ...rest] = name.split(" ");
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden className={`relative size-8 ${light ? "bg-white" : "bg-navy-900"}`}>
        <span className="absolute right-0 bottom-0 size-3 bg-teal-500" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-semibold tracking-tight ${light ? "text-white" : "text-navy-950"}`}
        >
          {first}
        </span>
        {rest.length > 0 && (
          <span
            className={`mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.3em] ${
              light ? "text-navy-300" : "text-navy-500"
            }`}
          >
            {rest.join(" ")}
          </span>
        )}
      </span>
    </span>
  );
}

export async function SiteHeader() {
  const settings = await getSiteSettings();
  const companyName = settings?.companyName || "Nexora Corporate";

  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)] border-b border-navy-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-full items-center justify-between">
        <Link href="/" aria-label={`${companyName} home`}>
          <Logo name={companyName} />
        </Link>
        <Suspense fallback={<SiteNavFallback />}>
          <SiteNav />
        </Suspense>
      </Container>
    </header>
  );
}
