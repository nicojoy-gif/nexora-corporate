import Image from "next/image";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

type BodyImage = {
  asset?: { _id: string; metadata?: { dimensions?: { width: number; height: number } } };
  alt?: string;
  caption?: string;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 leading-[1.8]">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-14 font-serif text-3xl leading-tight font-medium tracking-tight text-navy-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-semibold tracking-tight text-navy-950">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-teal-500 pl-6 font-serif text-2xl leading-snug text-navy-900">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-teal-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 marker:text-navy-400">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-navy-950">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-medium text-teal-700 underline decoration-teal-600/40 underline-offset-4 hover:decoration-teal-600"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: BodyImage }) => {
      if (!value?.asset?._id) return null;
      const dims = value.asset.metadata?.dimensions;
      return (
        <figure className="my-12">
          <Image
            src={urlFor(value).fit("max").url()}
            alt={value.alt ?? ""}
            width={dims?.width ?? 1600}
            height={dims?.height ?? 1000}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full"
          />
          {value.caption && (
            <figcaption className="mt-3 text-sm text-navy-500">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] | null }) {
  if (!value?.length) return null;
  return (
    <div className="text-lg text-navy-700 [&>*:first-child]:mt-0">
      <PortableText value={value} components={components} />
    </div>
  );
}
