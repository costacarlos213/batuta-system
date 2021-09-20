import { ObjectId } from "bson"
import { Order } from "src/entities/Order/Order"
import { IOrderRepository } from "src/repositories/orderRepository/IOrderRepository"
import { IUpdateOrderDTO } from "./UpdateOrderUseCaseDTO"
import { Order as PrismaOrder } from "@prisma/client"

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderData: IUpdateOrderDTO): Promise<void> {
    if (!orderData.id) {
      throw new Error("Missing order ID")
    }

    const oldOrder: PrismaOrder = await this.orderRepository.getUnique(
      orderData.id
    )

    const id = new ObjectId(orderData.id)

    const fileKeys = [...oldOrder.fileNames]
    const fileUrls = [...oldOrder.fileKeys]

    orderData.insertedFiles.forEach(insertedFile => {
      fileKeys.push(insertedFile.key)
      fileUrls.push(insertedFile.location)
    })

    const filteredFileKeys = await fileKeys.filter(fileKey => {
      if (orderData.deletedFiles.length === 0) {
        return true
      }

      const findDeleted = orderData.deletedFiles.find(
        deletedFile => deletedFile === fileKey
      )

      if (!findDeleted) {
        return true
      } else {
        return false
      }
    })

    const filteredFileUrls = await fileUrls.filter(fileUrl => {
      if (orderData.deletedFiles.length === 0) {
        return true
      }

      const findDeleted = orderData.deletedFiles.find(
        deletedFile => deletedFile === fileUrl.split("/")[3].replace("%40", "@")
      )

      if (!findDeleted) {
        return true
      } else {
        return false
      }
    })

    const order = Order.create({
      ...oldOrder,
      ...orderData,
      total: parseFloat(orderData.total) || oldOrder.total,
      id,
      files: {
        fileKeys: filteredFileKeys,
        fileUrls: filteredFileUrls
      }
    })

    await this.orderRepository.update(order, orderData.deletedFiles)
  }
}
