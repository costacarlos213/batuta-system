import puppeteer from "puppeteer"
import { SimpleTableContent } from "src/@types/table"
import { generateSimpleTable } from "src/providers/html/SimpleTableProvider"

export class PrintSimpleUseCase {
  async execute(tableContent: SimpleTableContent): Promise<Buffer> {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    const pdfContent = generateSimpleTable(tableContent)

    await page.setContent(pdfContent)

    const pdfBuffer = await page.pdf({
      format: "a4",
      printBackground: true,
      scale: 0.7,
      margin: {
        top: "2cm",
        left: "1cm",
        bottom: "2cm",
        right: "1cm"
      }
    })

    await page.close()
    await browser.close()

    return pdfBuffer
  }
}
