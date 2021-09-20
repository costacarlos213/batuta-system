import { DeleteOrderController } from "src/controllers/DeleteOrderController"
import { OrderRepository } from "src/repositories/orderRepository/implementation/OrderRepository"
import { DeleteOrderUseCase } from "src/useCases/deleteOrder/DeleteOrderUseCase"

function deleteOrderControllerFactory() {
  const orderRepository = new OrderRepository()

  const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository)

  const deleteOrderController = new DeleteOrderController(deleteOrderUseCase)

  return deleteOrderController
}

export const deleteOrderController = deleteOrderControllerFactory()
