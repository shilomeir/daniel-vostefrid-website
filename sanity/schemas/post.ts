export const postSchema = {
  name: "post",
  title: "פוסט בבלוג",
  type: "document",
  fields: [
    {
      name: "title",
      title: "כותרת",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "author",
      title: "מחבר",
      type: "string",
      initialValue: "דניאל וסטפריד",
    },
    {
      name: "mainImage",
      title: "תמונה ראשית",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "categories",
      title: "קטגוריות",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "שיטת ימימה", value: "yemima" },
          { title: "טיפול אישי", value: "personal" },
          { title: "גוף-נפש", value: "mindbody" },
          { title: "מילואים וחיילים", value: "soldiers" },
          { title: "הורות", value: "parenting" },
        ],
      },
    },
    {
      name: "publishedAt",
      title: "תאריך פרסום",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "תקציר",
      type: "text",
      rows: 3,
    },
    {
      name: "body",
      title: "תוכן",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        { name: "metaDescription", title: "Meta Description", type: "text" },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage" },
  },
};
