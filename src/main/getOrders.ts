import { GetOrdersController } from "src/controllers/GetOrdersController"
import { OrderRepository } from "src/repositories/orderRepository/implementation/OrderRepository"
import { GetOrdersUseCase } from "src/useCases/getOrders/getOrdersUseCase"

function getOrdersControllerFactory() {
  const orderRepository = new OrderRepository()

  const getOrdersUseCase = new GetOrdersUseCase(orderRepository)

  const getOrdersController = new GetOrdersController(getOrdersUseCase)

  return getOrdersController
}

export const getOrdersController = getOrdersControllerFactory()
