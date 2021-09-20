import { CreateOrderController } from "src/controllers/CreateOrderController"
import { OrderRepository } from "src/repositories/orderRepository/implementation/OrderRepository"
import { TokenRepository } from "src/repositories/tokenRepository/implementation/TokenRepository"
import { CreateOrderUseCase } from "src/useCases/createOrder/CreateOrderUseCase"

function createOrderControllerFactory() {
  const orderRepository = new OrderRepository()
  const tokenRepository = new TokenRepository()

  const createOrderUseCase = new CreateOrderUseCase(
    orderRepository,
    tokenRepository
  )

  const createOrderController = new CreateOrderController(createOrderUseCase)

  return createOrderController
}

export const createOrderController = createOrderControllerFactory()
