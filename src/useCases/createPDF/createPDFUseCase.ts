import puppeteer from "puppeteer"
import { FullTableContent, SimpleTableContent } from "src/@types/table"
import { generateFullTable } from "src/providers/html/FullTableProvider"
import { generateSimpleTable } from "src/providers/html/SimpleTableProvider"
import { IOrderRepository } from "src/repositories/orderRepository/IOrderRepository"
import { ICreatePDFUseCaseDTO } from "./CreatePDFUseCaseDTO"

export class CreatePDFUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(pdf: ICreatePDFUseCaseDTO): Promise<Buffer> {
    console.log("Searching on database")
    const orders = await this.orderRepository.get(pdf.filters)

    console.log("Creating pdf")
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

    if (pdf.pdfType === "simple") {
      pdfContent = generateSimpleTable(orders as SimpleTableContent)
      margin = {
        top: "3cm",
        left: "1cm",
        bottom: "2cm",
        right: "1cm"
      }
      scale = 1
    } else if (pdf.pdfType === "full") {
      pdfContent = generateFullTable(orders as FullTableContent)
      margin = {
        top: "3cm",
        left: "1cm",
        bottom: "2cm"
      }
      scale = 0.8
    } else {
      throw new Error("Invalid pdf type")
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
