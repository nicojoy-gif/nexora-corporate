import { cacheLife, cacheTag } from "next/cache";
import { client } from "./client";
import {
  ABOUT_QUERY,
  FEATURED_SERVICES_QUERY,
  HOMEPAGE_QUERY,
  LATEST_NEWS_QUERY,
  NEWS_ARTICLE_QUERY,
  NEWS_LIST_QUERY,
  NEWS_SLUGS_QUERY,
  SERVICE_QUERY,
  SERVICE_SLUGS_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
} from "./queries";
import type {
  AboutPage,
  Homepage,
  NewsArticle,
  NewsCard,
  Service,
  ServiceCard,
  SiteSettings,
} from "./types";

export async function getHomepage() {
  "use cache";
  cacheLife("minutes");
  cacheTag("homepage");
  return client.fetch<Homepage>(HOMEPAGE_QUERY);
}

export async function getSiteSettings() {
  "use cache";
  cacheLife("minutes");
  cacheTag("siteSettings");
  return client.fetch<SiteSettings>(SETTINGS_QUERY);
}

export async function getAboutPage() {
  "use cache";
  cacheLife("minutes");
  cacheTag("aboutPage");
  return client.fetch<AboutPage>(ABOUT_QUERY);
}

export async function getServices() {
  "use cache";
  cacheLife("minutes");
  cacheTag("service");
  return (await client.fetch<ServiceCard[]>(SERVICES_QUERY)) ?? [];
}

export async function getFeaturedServices() {
  "use cache";
  cacheLife("minutes");
  cacheTag("service");
  return (await client.fetch<ServiceCard[]>(FEATURED_SERVICES_QUERY)) ?? [];
}

export async function getService(slug: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("service", `service:${slug}`);
  return client.fetch<Service | null>(SERVICE_QUERY, { slug });
}

export async function getServiceSlugs() {
  "use cache";
  cacheLife("minutes");
  cacheTag("service");
  return (await client.fetch<string[]>(SERVICE_SLUGS_QUERY)) ?? [];
}

export async function getNewsList() {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");
  return (await client.fetch<NewsCard[]>(NEWS_LIST_QUERY)) ?? [];
}

export async function getLatestNews() {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");
  return (await client.fetch<NewsCard[]>(LATEST_NEWS_QUERY)) ?? [];
}

export async function getNewsArticle(slug: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("news", `news:${slug}`);
  return client.fetch<NewsArticle | null>(NEWS_ARTICLE_QUERY, { slug });
}

export async function getNewsSlugs() {
  "use cache";
  cacheLife("minutes");
  cacheTag("news");
  return (await client.fetch<string[]>(NEWS_SLUGS_QUERY)) ?? [];
}
