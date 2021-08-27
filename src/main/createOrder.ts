import { CreateOrderController } from "src/controllers/CreateOrderController"
import { OrderRepository } from "src/repositories/orderRepository/implementation/OrderRepository"
import { VendorRepository } from "src/repositories/userRepository/implementation/VendorRepository"
import { CreateOrderUseCase } from "src/useCases/createOrder/CreateOrderUseCase"

function createOrderControllerFactory() {
  const orderRepository = new OrderRepository()
  const vendorRepository = new VendorRepository()

  const createOrderUseCase = new CreateOrderUseCase(
    orderRepository,
    vendorRepository
  )

  const createOrderController = new CreateOrderController(createOrderUseCase)

  return createOrderController
}

export const createOrderController = createOrderControllerFactory()
