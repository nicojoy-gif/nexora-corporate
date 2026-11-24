import { defineField } from "sanity";

export function imageWithAlt({
  name,
  title,
  group,
}: {
  name: string;
  title: string;
  group?: string;
}) {
  return defineField({
    name,
    title,
    type: "image",
    group,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        description: "Describe the image for screen readers and search engines.",
      }),
    ],
  });
}
