import { FullTableContent, SimpleTableContent } from "../../@types/table"

export interface IPrintPDFDTO {
  pdfData: SimpleTableContent | FullTableContent
  pdfType: "full" | "simple"
}
