import { UpdateOrderController } from "../controllers/UpdateOrderController"
import { OrderRepository } from "../repositories/orderRepository/implementation/OrderRepository"
import { UpdateOrderUseCase } from "../useCases/updateOrder/UpdateOrderUseCase"

function updateOrderControllerFactory() {
  const orderRepository = new OrderRepository()

  const updateOrderUseCase = new UpdateOrderUseCase(orderRepository)

  const updateOrderController = new UpdateOrderController(updateOrderUseCase)

  return updateOrderController
}

export const updateOrderController = updateOrderControllerFactory()
