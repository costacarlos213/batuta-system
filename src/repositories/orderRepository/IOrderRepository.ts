import { Order } from "../../entities/Order/Order"
import { Order as PrismaOrder, Pix } from "@prisma/client"
import { IFilters } from "../../@types/report"

export interface IOrderId {
  id: string
}

export interface IOrderWithVendor extends PrismaOrder {
  vendor: {
    pixType: Pix
    pixKey: string
    name: string
    id: string
  }
}

export interface IOrderRepository {
  save(order: Order[]): Promise<void>
  delete(orderIds: IOrderId[]): Promise<void>
  update(order: Order, deletedFiles: string[]): Promise<void>
  get(filter: IFilters): Promise<IOrderWithVendor[]>
  getUnique(id: string): Promise<PrismaOrder>
  count(): Promise<number>
}
