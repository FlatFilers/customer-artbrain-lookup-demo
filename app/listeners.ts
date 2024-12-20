import type { FlatfileListener } from "@flatfile/listener";
import { FlatfileRecord, bulkRecordHook } from "@flatfile/plugin-record-hook";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import spaceConfigure from "./jobs/space.configure";

export default function (listener: FlatfileListener): void {
  listener.use(ExcelExtractor());
  listener.use(spaceConfigure);

  listener.use(
    bulkRecordHook("bids", async (records: FlatfileRecord[], event) => {

      records.map((record) => {

        if (record.get('paddleNumber')) {
          const links = record.getLinks('paddleNumber')
          const lookupValue = links?.[0]?.['email']
          const targetField = 'bidder'
          if (lookupValue !== undefined) {
            record.set(targetField, lookupValue)
            record.addInfo(targetField, 'From linked file')
          }
        }

        if (record.get('code')) {
          const links = record.getLinks('code')
          const lookupValue = links?.[0]?.['department']
          const targetField = 'department'
          if (lookupValue !== undefined) {
            record.set(targetField, lookupValue)
            record.addInfo(targetField, 'From linked file')
          }
        }

        if (record.get('code')) {
          const links = record.getLinks('code')
          const lookupValue = links?.[0]?.['category']
          const targetField = 'category'
          if (lookupValue !== undefined) {
            record.set(targetField, lookupValue)
            record.addInfo(targetField, 'From linked file')
          }
        }

        if (record.get('code')) {
          const links = record.getLinks('code')
          const lookupValue = links?.[0]?.['tag']
          const targetField = 'tag'
          if (lookupValue !== undefined) {
            record.set(targetField, lookupValue)
            record.addInfo(targetField, 'From linked file')
          }
        }

        return record;

      })


    })
  )
}
