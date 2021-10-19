import { Order } from "@prisma/client"
import { IFilters } from "../../@types/report"
import { IOrderRepository } from "../../repositories/orderRepository/IOrderRepository"

export class GetOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(filters: IFilters): Promise<Order[]> {
    const orders = await this.orderRepository.get(filters)

    return orders
  }
}
