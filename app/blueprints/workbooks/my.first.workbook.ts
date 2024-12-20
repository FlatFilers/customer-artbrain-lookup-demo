import type { Flatfile } from "@flatfile/api";

export const blueprint: Flatfile.CreateWorkbookConfig = {
  name: "My First Workbook",
  sheets: [
    {
      name: "Bids",
      slug: "bids",
      fields: [
        {
          key: "lotNumber",
          type: "string",
          label: "Lot No.",
        },
        {
          key: "bidPrice",
          type: "number",
          label: "Bid Price",
        },
        {
          key: "paddleNumber",
          type: "reference",
          label: "Paddle No.",
          config: {
            ref: "bidders",
            key: "paddleNumber",
            relationship: "has-one",
          },
        },
        {
          key: "bidder",
          type: "string",
          label: "Bidder (lookup)",
          readonly: true,
        },
        {
          key: "code",
          type: "reference",
          label: "Code",
          config: {
            ref: "categories",
            key: "code",
            relationship: "has-one",
          },

        },
        {
          key: "department",
          type: "string",
          label: "Department (lookup)",
          readonly: true,
        },
        {
          key: "category",
          type: "string",
          label: "Category (lookup)",
          readonly: true,
        },
        {
          key: "tag",
          type: "string",
          label: "Tag (lookup)",
          readonly: true,
        },
      ],
    },
    {
      name: "Bidders",
      slug: "bidders",
      fields: [
        {
          key: "paddleNumber",
          type: "string",
          label: "Paddle No.",
          constraints: [
            { type: "unique" },
            { type: "required" }
          ],
        },
        {
          key: "email",
          type: "string",
          label: "Email",
        },
      ],
    },
    {
      name: "Categories",
      slug: "categories",
      fields: [
        {
          key: "code",
          type: "string",
          label: "Code",
          constraints: [
            { type: "unique" },
            { type: "required" }
          ],
        },
        {
          key: "department",
          type: "string",
          label: "Department",
        },
        {
          key: "category",
          type: "string",
          label: "Category",
        },
        {
          key: "tag",
          type: "string",
          label: "Tag",
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
