import { defineArrayMember, defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";
import { imageWithAlt } from "./shared";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  groups: [
    { name: "intro", title: "Introduction", default: true },
    { name: "purpose", title: "Mission & vision" },
    { name: "values", title: "Core values" },
    { name: "team", title: "Leadership" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Page heading",
      type: "string",
      group: "intro",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 4,
      group: "intro",
    }),
    defineField({
      name: "story",
      title: "Company story",
      type: "array",
      group: "intro",
      of: [defineArrayMember({ type: "block" })],
    }),
    imageWithAlt({ name: "image", title: "Company image", group: "intro" }),

    defineField({ name: "mission", title: "Mission", type: "text", rows: 4, group: "purpose" }),
    defineField({ name: "vision", title: "Vision", type: "text", rows: 4, group: "purpose" }),

    defineField({
      name: "values",
      title: "Core values",
      type: "array",
      group: "values",
      of: [
        defineArrayMember({
          type: "object",
          name: "coreValue",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),

    defineField({
      name: "leadershipHeading",
      title: "Leadership heading",
      type: "string",
      group: "team",
      initialValue: "Leadership",
    }),
    defineField({
      name: "leadershipIntro",
      title: "Leadership introduction",
      type: "text",
      rows: 3,
      group: "team",
    }),
    defineField({
      name: "team",
      title: "Leadership team",
      type: "array",
      group: "team",
      of: [
        defineArrayMember({
          type: "object",
          name: "member",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "bio", title: "Short bio", type: "text", rows: 3 }),
            imageWithAlt({ name: "photo", title: "Photo" }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
