import type { FlatfileListener } from "@flatfile/listener";
import type { SetupFactory } from "@flatfile/plugin-space-configure";

import { configureSpace } from "@flatfile/plugin-space-configure";
import myFirstWorkbook from "../blueprints/workbooks/my.first.workbook";
import welcomeToFlatfileDocument from "../blueprints/documents/welcome.to.flatfile";

export default async function spaceConfigure(listener: FlatfileListener) {
  const config: SetupFactory = {
    workbooks: [myFirstWorkbook],
    documents: [welcomeToFlatfileDocument],
    space: {
      metadata: {
        userAgent: "Create Flatfile App (v1.0.0)",
      },
    },
    config: {
      maintainWorkbookOrder: true,
    },
  };

  listener.use(configureSpace(config));
}
