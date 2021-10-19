import { CreateOrderController } from "../controllers/CreateOrderController"
import { OrderRepository } from "../repositories/orderRepository/implementation/OrderRepository"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"
import { CreateOrderUseCase } from "../useCases/createOrder/CreateOrderUseCase"

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
