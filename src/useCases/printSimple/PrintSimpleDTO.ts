import { FullTableContent, SimpleTableContent } from "src/@types/table"

export interface IPrintPDFDTO {
  pdfData: SimpleTableContent | FullTableContent
  pdfType: "full" | "simple"
}
