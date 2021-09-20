import puppeteer from "puppeteer"
import { FullTableContent, SimpleTableContent } from "src/@types/table"
import { generateFullTable } from "src/providers/html/FullTableProvider"
import { generateSimpleTable } from "src/providers/html/SimpleTableProvider"
import { IPrintPDFDTO } from "./PrintSimpleDTO"

export class PrintSimpleUseCase {
  async execute({ pdfData, pdfType }: IPrintPDFDTO): Promise<Buffer> {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    let pdfContent: string
    let margin: {
      top?: string
      left?: string
      right?: string
      bottom?: string
    }
    let scale: number

    if (pdfType === "simple") {
      pdfContent = generateSimpleTable(pdfData as SimpleTableContent)

      margin = {
        top: "3cm",
        left: "1cm",
        bottom: "2cm",
        right: "1cm"
      }
      scale = 1
    } else if (pdfType === "full") {
      pdfContent = generateFullTable(pdfData as FullTableContent)

      margin = {
        top: "3cm",
        left: "1cm",
        bottom: "2cm"
      }
      scale = 0.8
    }

    await page.setContent(pdfContent)

    const pdfBuffer = await page.pdf({
      format: "a4",
      printBackground: true,
      margin,
      scale
    })

    await page.close()
    await browser.close()

    return pdfBuffer
  }
}
