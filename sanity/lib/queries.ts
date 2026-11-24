import { defineQuery } from "next-sanity";

const IMAGE = `{
  asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
  hotspot,
  crop,
  alt
}`;

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    heroHeading,
    heroDescription,
    "heroImage": heroImage ${IMAGE},
    buttonText,
    buttonLink,
    introEyebrow,
    introHeading,
    introText,
    "introImage": introImage ${IMAGE},
    stats[] { _key, value, label },
    ctaHeading,
    ctaText,
    ctaButtonText
  }
`);

const SERVICE_CARD = `
  _id,
  title,
  "slug": slug.current,
  icon,
  summary,
  "image": image ${IMAGE}
`;

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(coalesce(order, 999) asc, title asc) {
    ${SERVICE_CARD}
  }
`);

export const FEATURED_SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]
    | order(featured desc, coalesce(order, 999) asc, title asc)[0...3] {
    ${SERVICE_CARD}
  }
`);

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    ${SERVICE_CARD},
    highlights,
    body,
    "related": *[_type == "service" && defined(slug.current) && slug.current != $slug]
      | order(coalesce(order, 999) asc)[0...3] { ${SERVICE_CARD} }
  }
`);

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)].slug.current
`);

const NEWS_CARD = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  "image": image ${IMAGE}
`;

export const NEWS_LIST_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)] | order(publishedAt desc) {
    ${NEWS_CARD}
  }
`);

export const LATEST_NEWS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    ${NEWS_CARD}
  }
`);

export const NEWS_ARTICLE_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    ${NEWS_CARD},
    body[] {
      ...,
      _type == "image" => { ..., asset-> }
    },
    "more": *[_type == "news" && defined(slug.current) && slug.current != $slug]
      | order(publishedAt desc)[0...3] { ${NEWS_CARD} }
  }
`);

export const NEWS_SLUGS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)].slug.current
`);

export const ABOUT_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    heading,
    introduction,
    story,
    "image": image ${IMAGE},
    mission,
    vision,
    values[] { _key, title, description },
    leadershipHeading,
    leadershipIntro,
    team[] { _key, name, role, bio, "photo": photo ${IMAGE} }
  }
`);

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    contactEmail,
    phone,
    address,
    officeHours,
    socialLinks[] { _key, platform, url }
  }
`);
