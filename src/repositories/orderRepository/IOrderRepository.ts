import { Order } from "src/entities/Order/Order"

export interface IOrderRepository {
  save(order: Order): Promise<void>
}
