import { CountOrdersController } from "../controllers/CountOrdersController"
import { OrderRepository } from "../repositories/orderRepository/implementation/OrderRepository"
import { CountOrdersUseCase } from "../useCases/countOrders/CountOrdersUseCase"

function countOrdersControllerFactory() {
  const orderRepository = new OrderRepository()

  const countOrdersUseCase = new CountOrdersUseCase(orderRepository)

  const countOrdersController = new CountOrdersController(countOrdersUseCase)

  return countOrdersController
}

export const countOrdersController = countOrdersControllerFactory()
