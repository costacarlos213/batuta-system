import { CreatePDFController } from "src/controllers/createPDFController"
import { OrderRepository } from "src/repositories/orderRepository/implementation/OrderRepository"
import { CreatePDFUseCase } from "src/useCases/createPDF/createPDFUseCase"

function createPDFControllerFactory() {
  const orderRepository = new OrderRepository()

  const createPDFUseCase = new CreatePDFUseCase(orderRepository)

  const createPDFController = new CreatePDFController(createPDFUseCase)

  return createPDFController
}

export const createPDFController = createPDFControllerFactory()
