import type { FlatfileListener } from "@flatfile/listener";

import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import spaceConfigure from "./jobs/space.configure";

export default function (listener: FlatfileListener): void {
  listener.use(ExcelExtractor());
  listener.use(spaceConfigure);
}
