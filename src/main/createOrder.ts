import { VendorRepository } from "../repositories/userRepository/implementation/VendorRepository"
import { CreateOrderController } from "../controllers/CreateOrderController"
import { OrderRepository } from "../repositories/orderRepository/implementation/OrderRepository"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"
import { CreateOrderUseCase } from "../useCases/createOrder/CreateOrderUseCase"

function createOrderControllerFactory() {
  const orderRepository = new OrderRepository()
  const tokenRepository = new TokenRepository()
  const vendorRepository = new VendorRepository()

  const createOrderUseCase = new CreateOrderUseCase(
    orderRepository,
    vendorRepository,
    tokenRepository
  )

  const createOrderController = new CreateOrderController(createOrderUseCase)

  return createOrderController
}

export const createOrderController = createOrderControllerFactory()
