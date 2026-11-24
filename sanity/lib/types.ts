import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  asset?: {
    _id: string;
    url: string;
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } };
  } | null;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string | null;
} | null;

export type Stat = { _key: string; value: string; label: string };

export type Homepage = {
  heroHeading: string;
  heroDescription?: string | null;
  heroImage?: SanityImage;
  buttonText?: string | null;
  buttonLink?: string | null;
  introEyebrow?: string | null;
  introHeading?: string | null;
  introText?: string | null;
  introImage?: SanityImage;
  stats?: Stat[] | null;
  ctaHeading?: string | null;
  ctaText?: string | null;
  ctaButtonText?: string | null;
} | null;

export type ServiceCard = {
  _id: string;
  title: string;
  slug: string;
  icon?: string | null;
  summary?: string | null;
  image?: SanityImage;
};

export type Service = ServiceCard & {
  highlights?: string[] | null;
  body?: PortableTextBlock[] | null;
  related?: ServiceCard[];
};

export type NewsCard = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string | null;
  category?: string | null;
  excerpt?: string | null;
  image?: SanityImage;
};

export type NewsArticle = NewsCard & {
  body?: PortableTextBlock[] | null;
  more?: NewsCard[];
};

export type AboutPage = {
  heading: string;
  introduction?: string | null;
  story?: PortableTextBlock[] | null;
  image?: SanityImage;
  mission?: string | null;
  vision?: string | null;
  values?: { _key: string; title: string; description?: string | null }[] | null;
  leadershipHeading?: string | null;
  leadershipIntro?: string | null;
  team?: {
    _key: string;
    name: string;
    role?: string | null;
    bio?: string | null;
    photo?: SanityImage;
  }[] | null;
} | null;

export type SiteSettings = {
  companyName?: string | null;
  tagline?: string | null;
  contactEmail?: string | null;
  phone?: string | null;
  address?: string | null;
  officeHours?: string | null;
  socialLinks?: { _key: string; platform: string; url: string }[] | null;
} | null;
