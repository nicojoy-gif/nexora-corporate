import { getFeaturedServices, getHomepage, getLatestNews } from "@/sanity/lib/data";
import { NewsCard, ServiceCard } from "@/components/cards";
import { SanityImage } from "@/components/sanity-image";
import { EnquiryCta } from "@/components/sections";
import { ArrowLink, ButtonLink, Container, EmptyState, Eyebrow, SectionHeading } from "@/components/ui";

export default async function Home() {
  const [homepage, services, news] = await Promise.all([
    getHomepage(),
    getFeaturedServices(),
    getLatestNews(),
  ]);

  if (!homepage) {
    return (
      <Container className="py-32">
        <EmptyState title="No homepage content published yet.">
          Create and publish the Homepage document in the Studio at /studio.
        </EmptyState>
      </Container>
    );
  }

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-end overflow-hidden bg-navy-950 md:min-h-[44rem]">
        <SanityImage image={homepage.heroImage} sizes="100vw" priority className="-z-20" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,19,38,0.92)_0%,rgba(8,19,38,0.72)_45%,rgba(8,19,38,0.25)_100%)]"
        />
        <Container className="pt-32 pb-20 md:pb-28">
          <div className="max-w-3xl animate-fade-up text-white">
            <Eyebrow light>Business consulting &amp; technology</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.04] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {homepage.heroHeading}
            </h1>
            {homepage.heroDescription && (
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-navy-100 md:text-xl">
                {homepage.heroDescription}
              </p>
            )}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {homepage.buttonText && (
                <ButtonLink href={homepage.buttonLink || "/contact"} variant="light">
                  {homepage.buttonText}
                </ButtonLink>
              )}
              <ButtonLink href="/services" variant="outline-light">
                Our services
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {(homepage.introHeading || homepage.introText) && (
        <section className="py-24 md:py-32">
          <Container className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
            <div className="lg:col-span-6">
              <Eyebrow>{homepage.introEyebrow || "Who we are"}</Eyebrow>
              {homepage.introHeading && (
                <h2 className="mt-5 font-serif text-3xl leading-tight font-medium tracking-tight text-balance text-navy-950 md:text-[2.75rem]">
                  {homepage.introHeading}
                </h2>
              )}
              {homepage.introText && (
                <p className="mt-7 text-lg leading-relaxed whitespace-pre-line text-navy-600">
                  {homepage.introText}
                </p>
              )}
              <div className="mt-10">
                <ArrowLink href="/about">More about Nexora</ArrowLink>
              </div>
            </div>
            <div className="relative lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden bg-navy-100">
                <SanityImage
                  image={homepage.introImage}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div
                aria-hidden
                className="absolute -bottom-5 -left-5 -z-10 hidden h-2/3 w-2/3 bg-navy-50 md:block"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-navy-50 py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Advisory and technology services built for African markets."
            action={<ArrowLink href="/services">View all services</ArrowLink>}
          />
          <div className="mt-14">
            {services.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, i) => (
                  <ServiceCard key={service._id} service={service} index={i} />
                ))}
              </div>
            ) : (
              <EmptyState title="No services published yet.">
                Add Service documents in the Studio to populate this section.
              </EmptyState>
            )}
          </div>
        </Container>
      </section>

      {homepage.stats && homepage.stats.length > 0 && (
        <section aria-label="Company statistics" className="bg-navy-950 text-white">
          <Container>
            <dl className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
              {homepage.stats.map((stat, i) => (
                <div
                  key={stat._key}
                  className={`flex flex-col-reverse gap-3 py-12 lg:px-10 lg:py-16 ${
                    i === 0 ? "lg:pl-0" : ""
                  } ${i % 2 === 1 ? "pl-6 lg:pl-10" : ""} ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""}`}
                >
                  <dt className="text-sm leading-snug text-navy-300">{stat.label}</dt>
                  <dd className="font-serif text-5xl font-medium tracking-tight text-white md:text-6xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Insights & news"
            title="Latest from Nexora"
            action={<ArrowLink href="/news">All news</ArrowLink>}
          />
          <div className="mt-14">
            {news.length > 0 ? (
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {news.map((article) => (
                  <NewsCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <EmptyState title="No news articles published yet.">
                Publish a News Article in the Studio to see it here.
              </EmptyState>
            )}
          </div>
        </Container>
      </section>

      <EnquiryCta
        heading={homepage.ctaHeading}
        text={homepage.ctaText}
        buttonText={homepage.ctaButtonText}
      />
    </>
  );
}
