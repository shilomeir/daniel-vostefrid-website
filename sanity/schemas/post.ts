import { defineField, defineType } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "מאמר",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "כותרת המאמר",
      type: "string",
      validation: (Rule) => Rule.required().error("חובה להזין כותרת"),
    }),
    defineField({
      name: "slug",
      title: "כתובת המאמר",
      type: "slug",
      description: "נוצר אוטומטית מהכותרת — לחץ על Generate",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\u0590-\u05FFa-zA-Z0-9-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error("חובה ליצור כתובת למאמר"),
    }),
    defineField({
      name: "mainImage",
      title: "תמונה ראשית",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "טקסט חלופי (נגישות)",
          type: "string",
          description: "תיאור קצר של התמונה לצורכי נגישות",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "תאריך פרסום",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      title: "תוכן המאמר",
      type: "array",
      of: [
        {
          type: "block",
          // RTL support for Hebrew text
          styles: [
            { title: "רגיל", value: "normal" },
            { title: "כותרת 2", value: "h2" },
            { title: "כותרת 3", value: "h3" },
            { title: "כותרת 4", value: "h4" },
            { title: "ציטוט", value: "blockquote" },
          ],
          lists: [
            { title: "רשימה עם נקודות", value: "bullet" },
            { title: "רשימה ממוספרת", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "מודגש", value: "strong" },
              { title: "נטוי", value: "em" },
              { title: "קו תחתון", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                title: "קישור",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "כתובת URL",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          title: "תמונה",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "טקסט חלופי",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, media, publishedAt } = selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("he-IL")
        : "טיוטה";
      return {
        title: title || "ללא כותרת",
        subtitle: date,
        media,
      };
    },
  },
  orderings: [
    {
      title: "תאריך פרסום (חדש לישן)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
