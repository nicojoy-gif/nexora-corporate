import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink, Container, Eyebrow } from "./ui";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string | null;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px)] [background-size:calc(100%/6)_100%]"
      />
      <Container className="relative py-20 md:py-28">
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-serif text-4xl leading-[1.08] font-medium tracking-tight text-balance md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 md:text-xl">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

export function EnquiryCta({
  heading,
  text,
  buttonText,
}: {
  heading?: string | null;
  text?: string | null;
  buttonText?: string | null;
}) {
  return (
    <section className="bg-navy-900 text-white">
      <Container className="grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <Eyebrow light>Business enquiries</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
            {heading || "Let’s discuss what your organisation needs next."}
          </h2>
          {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">{text}</p>}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
          <ButtonLink href="/contact" variant="light">
            {buttonText || "Start a conversation"}
          </ButtonLink>
          <p className="flex items-center gap-2 text-sm text-navy-300">
            <Mail aria-hidden className="size-4" /> We reply within two working days
          </p>
        </div>
      </Container>
    </section>
  );
}
