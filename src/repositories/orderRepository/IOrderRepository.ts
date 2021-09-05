import { Order } from "src/entities/Order/Order"
import { Order as PrismaOrder } from "@prisma/client"
import { IFilters } from "src/@types/report"

export interface IOrderRepository {
  save(order: Order): Promise<void>
  get(filter: IFilters): Promise<PrismaOrder[]>
}
