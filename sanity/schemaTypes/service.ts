import { defineArrayMember, defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";
import { imageWithAlt } from "./shared";

export const SERVICE_ICONS = [
  { title: "Strategy (compass)", value: "compass" },
  { title: "Technology (cpu)", value: "cpu" },
  { title: "Data & analytics (chart)", value: "chart" },
  { title: "Cloud", value: "cloud" },
  { title: "Security (shield)", value: "shield" },
  { title: "People (users)", value: "users" },
  { title: "Finance (landmark)", value: "landmark" },
  { title: "Growth (trending)", value: "trending" },
  { title: "Operations (settings)", value: "settings" },
  { title: "Global (globe)", value: "globe" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: SERVICE_ICONS },
      initialValue: "compass",
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),
    imageWithAlt({ name: "image", title: "Image" }),
    defineField({
      name: "highlights",
      title: "What is included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Service details",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "summary", media: "image", featured: "featured" },
    prepare: ({ title, subtitle, media, featured }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle,
      media,
    }),
  },
});
