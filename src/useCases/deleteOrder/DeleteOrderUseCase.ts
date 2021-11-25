import {
  IOrderId,
  IOrderRepository
} from "../../repositories/orderRepository/IOrderRepository"

export class DeleteOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderIds: IOrderId[]): Promise<void> {
    console.log(orderIds)

    await this.orderRepository.delete(orderIds)
  }
}
