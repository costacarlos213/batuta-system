import { IFilters } from "src/@types/report"
import { prisma } from "src/database/prisma"
import { Order } from "src/entities/Order/Order"
import { Order as PrismaOrder } from "@prisma/client"

import { IOrderRepository } from "../IOrderRepository"

export class OrderRepository implements IOrderRepository {
  async get(filters: IFilters): Promise<PrismaOrder[]> {
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          {
            cod: { equals: filters.code }
          },
          {
            address: { contains: filters.address }
          },
          {
            customerName: { equals: filters.customerName }
          },
          {
            delivery: { equals: filters.delivery }
          },
          {
            phone: { contains: filters.phone }
          },
          {
            description: { contains: filters.description }
          },
          {
            payment: { equals: filters.payment }
          },
          {
            date: {
              gte: filters.timeInterval?.initialDate,
              lt: filters.timeInterval?.finalDate
            }
          }
        ]
      }
    })

    return orders
  }

  async save(order: Order): Promise<void> {
    await prisma.order.create({
      data: {
        vendor: order.Vendor.value,
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
