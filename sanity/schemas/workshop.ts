export const workshopSchema = {
  name: "workshop",
  title: "סדנה",
  type: "document",
  fields: [
    {
      name: "title",
      title: "שם הסדנה",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "date",
      title: "תאריך",
      type: "datetime",
    },
    {
      name: "location",
      title: "מיקום",
      type: "string",
    },
    {
      name: "audience",
      title: "קהל יעד",
      type: "string",
      options: {
        list: [
          { title: "כללי", value: "general" },
          { title: "חיילים / מילואים", value: "soldiers" },
          { title: "הורים", value: "parents" },
        ],
      },
    },
    {
      name: "price",
      title: "מחיר",
      type: "string",
    },
    {
      name: "spots",
      title: "מספר מקומות",
      type: "number",
    },
    {
      name: "description",
      title: "תיאור",
      type: "text",
    },
    {
      name: "registrationLink",
      title: "קישור להרשמה",
      type: "url",
    },
  ],
};
