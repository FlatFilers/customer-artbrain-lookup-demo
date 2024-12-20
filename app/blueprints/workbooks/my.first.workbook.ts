import type { Flatfile } from "@flatfile/api";

export const blueprint: Flatfile.CreateWorkbookConfig = {
  name: "My First Workbook",
  sheets: [
    {
      name: "Contacts",
      slug: "contacts",
      fields: [
        {
          key: "name",
          type: "string",
          label: "Name",
        },
        {
          key: "email",
          type: "string",
          label: "Email",
        },
      ],
    },
  ],
  actions: [
    {
      operation: "submitActionFg",
      mode: "foreground",
      label: "Submit data",
      type: "string",
      description: "Submit this data to ...",
      primary: true,
    },
  ],
};

export default blueprint;
