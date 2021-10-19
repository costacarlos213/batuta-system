import { DeleteOrderController } from "../controllers/DeleteOrderController"
import { OrderRepository } from "../repositories/orderRepository/implementation/OrderRepository"
import { DeleteOrderUseCase } from "../useCases/deleteOrder/DeleteOrderUseCase"

function deleteOrderControllerFactory() {
  const orderRepository = new OrderRepository()

  const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository)

  const deleteOrderController = new DeleteOrderController(deleteOrderUseCase)

  return deleteOrderController
}

export const deleteOrderController = deleteOrderControllerFactory()
