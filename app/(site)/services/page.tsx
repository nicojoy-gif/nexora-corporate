import type { Metadata } from "next";
import { getServices } from "@/sanity/lib/data";
import { ServiceCard } from "@/components/cards";
import { EnquiryCta, PageHero } from "@/components/sections";
import { Container, EmptyState } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy, digital transformation, data, cloud and organisational advisory services from Nexora Corporate.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Practical expertise, from boardroom strategy to production systems."
        description="We combine management consulting with hands-on engineering, so the plans we help you make are the plans that get delivered."
      />
      <section className="bg-navy-50 py-20 md:py-28">
        <Container>
          {services.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <ServiceCard key={service._id} service={service} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState title="No services published yet.">
              Create a Service document in the Studio and publish it to list it here.
            </EmptyState>
          )}
        </Container>
      </section>
      <EnquiryCta />
    </>
  );
}
