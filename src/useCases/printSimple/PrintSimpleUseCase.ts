import { FullTableContent, SimpleTableContent } from "../../@types/table"
import { generateFullTable } from "../../providers/html/FullTableProvider"
import { generateSimpleTable } from "../../providers/html/SimpleTableProvider"
import { IPrintPDFDTO } from "./PrintSimpleDTO"
import { IPdfProvider } from "../../providers/pdf/IPdfProviderDTO"

type margintype = {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export class PrintSimpleUseCase {
  constructor(private pdfProvider: IPdfProvider) {}

  async execute({ pdfData, pdfType }: IPrintPDFDTO): Promise<Buffer> {
    let pdfContent: string
    let margin: margintype
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
        top: "2.5cm",
        left: "1cm",
        bottom: "2cm"
      }
      scale = 0.8
    }

    const pdfBuffer = await this.pdfProvider.execute({
      margin,
      scale,
      pdfContent
    })

    return pdfBuffer
  }
}
