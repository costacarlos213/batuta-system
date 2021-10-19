import { PdfProvider } from "../providers/pdf/pdfProvider"
import { PrintSimpleController } from "../controllers/PrintSimpleController"
import { PrintSimpleUseCase } from "../useCases/printSimple/PrintSimpleUseCase"

function printSimpleControllerFactory() {
  const pdfProvider = new PdfProvider()

  const printSimpleUseCase = new PrintSimpleUseCase(pdfProvider)

  const printSimpleController = new PrintSimpleController(printSimpleUseCase)

  return printSimpleController
}

export const printSimpleController = printSimpleControllerFactory()
