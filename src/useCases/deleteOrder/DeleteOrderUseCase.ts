import {
  IOrderId,
  IOrderRepository
} from "../../repositories/orderRepository/IOrderRepository"

export class DeleteOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderIds: IOrderId[]): Promise<void> {
    await this.orderRepository.delete(orderIds)
  }
}
