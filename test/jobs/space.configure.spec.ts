import { FlatfileClient } from "@flatfile/api";
import { getTestSpace, getTestSpaceId } from "../support/flatfile.helpers";

describe("`space.configure` Action", () => {
  const api = new FlatfileClient();

  it("creates the example workbook", async () => {
    const { data: workbooks } = await api.workbooks.list({ spaceId: getTestSpaceId() });

    expect(workbooks).toHaveLength(1);
    expect(workbooks[0]?.name).toEqual("My First Workbook");
    expect(workbooks[0]?.sheets).toHaveLength(1);
  });

  it("creates the default document", async () => {
    const space = await getTestSpace();
    const { data: documents } = await api.documents.list(space.id);

    expect(documents).toHaveLength(1);
    expect(documents[0]?.title).toEqual("Welcome to Flatfile! 🚀");
  });
});
