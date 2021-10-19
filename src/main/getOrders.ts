import { GetOrdersController } from "../controllers/GetOrdersController"
import { OrderRepository } from "../repositories/orderRepository/implementation/OrderRepository"
import { GetOrdersUseCase } from "../useCases/getOrders/getOrdersUseCase"

function getOrdersControllerFactory() {
  const orderRepository = new OrderRepository()

  const getOrdersUseCase = new GetOrdersUseCase(orderRepository)

  const getOrdersController = new GetOrdersController(getOrdersUseCase)

  return getOrdersController
}

export const getOrdersController = getOrdersControllerFactory()
