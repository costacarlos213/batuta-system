import { prisma } from "src/database/prisma"
import { Order } from "src/entities/Order/Order"
import { IOrderRepository } from "../IOrderRepository"

export class OrderRepository implements IOrderRepository {
  async save(order: Order): Promise<void> {
    await prisma.order.create({
      data: {
        address: order.Address.value,
        cod: order.Cod.value,
        customerName: order.CustomerName.value,
        date: order.Date,
        delivery: order.Delivery.value,
        description: order.Description.value,
        payment: order.Payment.value,
        phone: order.Phone.value,
        total: order.Total,
        comments: order.Comments,
        id: order.id.toHexString()
      }
    })
  }
}
