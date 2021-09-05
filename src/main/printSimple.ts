import { PrintSimpleController } from "src/controllers/PrintSimpleController"
import { PrintSimpleUseCase } from "src/useCases/printSimple/PrintSimpleUseCase"

function printSimpleControllerFactory() {
  const printSimpleUseCase = new PrintSimpleUseCase()

  const printSimpleController = new PrintSimpleController(printSimpleUseCase)

  return printSimpleController
}

export const printSimpleController = printSimpleControllerFactory()
