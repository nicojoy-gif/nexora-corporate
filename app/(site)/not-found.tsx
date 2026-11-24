import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 md:py-44">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight font-medium text-navy-950 md:text-6xl">
        We could not find that page.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-navy-600">
        It may have been moved or unpublished. Try the homepage or browse our services.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <ButtonLink href="/">Back to homepage</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Our services
        </ButtonLink>
      </div>
    </Container>
  );
}
