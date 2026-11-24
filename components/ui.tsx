import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`} {...props} />;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? "text-teal-300" : "text-teal-700"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string | null;
  light?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2
          className={`mt-4 font-serif text-3xl leading-tight font-medium tracking-tight text-balance md:text-[2.75rem] ${
            light ? "text-white" : "text-navy-950"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-5 text-lg leading-relaxed ${light ? "text-navy-200" : "text-navy-600"}`}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "light" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-700",
  secondary: "border border-navy-200 text-navy-900 hover:border-navy-900",
  light: "bg-white text-navy-950 hover:bg-teal-300",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const classes = `group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${buttonStyles[variant]} ${className}`;
  const content = (
    <>
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </>
  );
  return /^https?:\/\//.test(href) ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold ${
        light ? "text-white hover:text-teal-300" : "text-navy-900 hover:text-teal-700"
      } transition-colors`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="border border-dashed border-navy-200 px-8 py-14 text-center">
      <p className="font-medium text-navy-900">{title}</p>
      {children && <p className="mt-2 text-sm text-navy-500">{children}</p>}
    </div>
  );
}
