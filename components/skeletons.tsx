import { Container } from "./ui";

export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <section className="bg-navy-950">
        <Container className="py-24 md:py-32">
          <div className="h-4 w-28 animate-pulse bg-white/10" />
          <div className="mt-10 h-12 max-w-2xl animate-pulse bg-white/10" />
          <div className="mt-4 h-12 max-w-xl animate-pulse bg-white/10" />
          <div className="mt-8 h-5 max-w-lg animate-pulse bg-white/10" />
        </Container>
      </section>
      <Container className="space-y-4 py-24">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-4 max-w-3xl animate-pulse bg-navy-100" />
        ))}
      </Container>
    </div>
  );
}
