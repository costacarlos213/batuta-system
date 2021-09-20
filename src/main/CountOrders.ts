import { CountOrdersController } from "src/controllers/CountOrdersController"
import { OrderRepository } from "src/repositories/orderRepository/implementation/OrderRepository"
import { CountOrdersUseCase } from "src/useCases/countOrders/CountOrdersUseCase"

function countOrdersControllerFactory() {
  const orderRepository = new OrderRepository()

  const countOrdersUseCase = new CountOrdersUseCase(orderRepository)

  const countOrdersController = new CountOrdersController(countOrdersUseCase)

  return countOrdersController
}

export const countOrdersController = countOrdersControllerFactory()
