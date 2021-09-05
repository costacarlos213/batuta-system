import { IFilters } from "src/@types/report"

export interface ICreatePDFUseCaseDTO {
  filters: IFilters
  pdfType: "full" | "simple"
}
