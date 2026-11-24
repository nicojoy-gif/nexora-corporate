import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { imageWithAlt } from "./shared";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "intro", title: "Introduction" },
    { name: "stats", title: "Statistics" },
    { name: "cta", title: "Enquiry CTA" },
  ],

  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    imageWithAlt({ name: "heroImage", title: "Hero Image", group: "hero" }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      group: "hero",
      description: "Internal path (e.g. /contact) or a full URL.",
    }),

    defineField({
      name: "introEyebrow",
      title: "Introduction label",
      type: "string",
      group: "intro",
      initialValue: "Who we are",
    }),
    defineField({
      name: "introHeading",
      title: "Introduction heading",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introText",
      title: "Introduction text",
      type: "text",
      rows: 5,
      group: "intro",
    }),
    imageWithAlt({ name: "introImage", title: "Introduction image", group: "intro" }),

    defineField({
      name: "stats",
      title: "Company statistics",
      type: "array",
      group: "stats",
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g. 250+, 14, 98%",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    defineField({ name: "ctaHeading", title: "CTA heading", type: "string", group: "cta" }),
    defineField({ name: "ctaText", title: "CTA text", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaButtonText", title: "CTA button text", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
