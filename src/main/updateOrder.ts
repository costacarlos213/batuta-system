import { UpdateOrderController } from "src/controllers/UpdateOrderController"
import { OrderRepository } from "src/repositories/orderRepository/implementation/OrderRepository"
import { UpdateOrderUseCase } from "src/useCases/updateOrder/UpdateOrderUseCase"

function updateOrderControllerFactory() {
  const orderRepository = new OrderRepository()

  const updateOrderUseCase = new UpdateOrderUseCase(orderRepository)

  const updateOrderController = new UpdateOrderController(updateOrderUseCase)

  return updateOrderController
}

export const updateOrderController = updateOrderControllerFactory()
