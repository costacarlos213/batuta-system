import { Order } from "src/entities/Order/Order"
import { Order as PrismaOrder } from "@prisma/client"
import { IFilters } from "src/@types/report"

export interface IOrderId {
  id: string
}

export interface IOrderRepository {
  save(order: Order[]): Promise<void>
  delete(orderIds: IOrderId[]): Promise<void>
  update(order: Order, deletedFiles: string[]): Promise<void>
  get(filter: IFilters): Promise<PrismaOrder[]>
  getUnique(id: string): Promise<PrismaOrder>
  count(): Promise<number>
}
