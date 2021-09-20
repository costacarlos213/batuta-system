import { Order } from "@prisma/client"
import { IFilters } from "src/@types/report"
import { IOrderRepository } from "src/repositories/orderRepository/IOrderRepository"

export class GetOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(filters: IFilters): Promise<Order[]> {
    const orders = await this.orderRepository.get(filters)

    return orders
  }
}
