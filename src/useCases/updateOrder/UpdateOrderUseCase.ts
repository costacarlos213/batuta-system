import { ObjectId } from "bson"
import { Order } from "../../entities/Order/Order"
import { IOrderRepository } from "../../repositories/orderRepository/IOrderRepository"
import { IUpdateOrderDTO } from "./UpdateOrderUseCaseDTO"
import { Order as PrismaOrder } from "@prisma/client"

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderData: IUpdateOrderDTO): Promise<void> {
    console.log(orderData)

    if (!orderData.id) {
      throw new Error("Missing order ID")
    }

    const oldOrder: PrismaOrder = await this.orderRepository.getUnique(
      orderData.id
    )

    const id = new ObjectId(orderData.id)
    console.log(orderData.deletedFiles)

    const fileKeys = [...oldOrder.fileNames]
    const fileUrls = [...oldOrder.fileKeys]
    const fileSizes = [...oldOrder.fileSizes]
    const removedIndexes = []

    orderData.insertedFiles.forEach(insertedFile => {
      fileKeys.push(insertedFile.key)
      fileUrls.push(insertedFile.location)
      fileSizes.push(insertedFile.size)
    })

    if (orderData.deletedFiles.length !== 0) {
      for (let i = 0; i < fileKeys.length; i++) {
        const wasDeleted = orderData.deletedFiles.find(
          deletedFile => deletedFile === fileKeys[i]
        )

        if (wasDeleted) {
          removedIndexes.push(i)
        }
      }
    }

    removedIndexes.forEach(index => {
      fileKeys.splice(index, 1)
      fileUrls.splice(index, 1)
      fileSizes.splice(index, 1)
    })

    let total = orderData.total

    if (total === "" || !total || total.length === 0) {
      total = "0"
    }

    const order = Order.create({
      ...orderData,
      date: orderData.date || oldOrder.date,
      vendor: orderData.vendor || oldOrder.vendor,
      total: parseFloat(total),
      id,
      files: {
        fileKeys,
        fileUrls,
        fileSizes
      }
    })

    await this.orderRepository.update(order, orderData.deletedFiles)
  }
}
