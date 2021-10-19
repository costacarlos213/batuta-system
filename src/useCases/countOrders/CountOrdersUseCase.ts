import { IOrderRepository } from "../../repositories/orderRepository/IOrderRepository"

export class CountOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(): Promise<number> {
    const numberOfOrders = await this.orderRepository.count()
    return numberOfOrders
  }
}
