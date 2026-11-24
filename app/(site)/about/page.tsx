import type { Metadata } from "next";
import { getAboutPage } from "@/sanity/lib/data";
import { RichText } from "@/components/portable-text";
import { SanityImage } from "@/components/sanity-image";
import { EnquiryCta, PageHero } from "@/components/sections";
import { Container, EmptyState, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Our mission, vision, values and the leadership team behind Nexora Corporate.",
};

export default async function AboutPage() {
  const about = await getAboutPage();

  if (!about) {
    return (
      <>
        <PageHero eyebrow="About us" title="About Nexora Corporate" />
        <Container className="py-24">
          <EmptyState title="The About page has not been published yet.">
            Open “About Page” in the Studio, add content and publish.
          </EmptyState>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="About us" title={about.heading} description={about.introduction} />

      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:order-2 lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-100 lg:sticky lg:top-28">
              <SanityImage image={about.image} sizes="(min-width: 1024px) 50vw, 100vw" priority />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Our story</Eyebrow>
            <div className="mt-8">
              <RichText value={about.story} />
            </div>
          </div>
        </Container>
      </section>

      {(about.mission || about.vision) && (
        <section className="border-y border-navy-100 bg-navy-50">
          <Container className="grid md:grid-cols-2">
            {[
              { label: "Our mission", text: about.mission },
              { label: "Our vision", text: about.vision },
            ]
              .filter((item) => item.text)
              .map((item, i) => (
                <div
                  key={item.label}
                  className={`py-16 md:py-20 ${i === 1 ? "border-t border-navy-200 md:border-t-0 md:border-l md:pl-16" : "md:pr-16"}`}
                >
                  <Eyebrow>{item.label}</Eyebrow>
                  <p className="mt-6 font-serif text-2xl leading-snug text-navy-950 md:text-[1.75rem]">
                    {item.text}
                  </p>
                </div>
              ))}
          </Container>
        </section>
      )}

      {about.values && about.values.length > 0 && (
        <section className="py-24 md:py-32">
          <Container>
            <SectionHeading eyebrow="Core values" title="The principles behind every engagement." />
            <ol className="mt-14 grid gap-px overflow-hidden border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((value, i) => (
                <li key={value._key} className="bg-white p-8 transition-colors hover:bg-navy-50">
                  <span className="font-mono text-xs text-teal-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-navy-950">{value.title}</h3>
                  {value.description && (
                    <p className="mt-3 leading-relaxed text-navy-600">{value.description}</p>
                  )}
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {about.team && about.team.length > 0 && (
        <section className="bg-navy-50 py-24 md:py-32">
          <Container>
            <SectionHeading
              eyebrow="Our people"
              title={about.leadershipHeading || "Leadership"}
              description={about.leadershipIntro}
            />
            <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {about.team.map((member) => (
                <li key={member._key} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-navy-100">
                    <SanityImage
                      image={member.photo}
                      alt={member.photo?.alt || `Portrait of ${member.name}`}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="grayscale-[35%] transition duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-navy-950">{member.name}</h3>
                  {member.role && <p className="text-sm font-medium text-teal-700">{member.role}</p>}
                  {member.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">{member.bio}</p>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <EnquiryCta />
    </>
  );
}
