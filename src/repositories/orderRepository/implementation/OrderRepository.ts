import { IFilters } from "../../../@types/report"
import { prisma } from "../../../database/prisma"
import { Order } from "../../../entities/Order/Order"
import { Order as PrismaOrder } from "@prisma/client"
import aws from "aws-sdk"

import { IOrderId, IOrderRepository } from "../IOrderRepository"

export class OrderRepository implements IOrderRepository {
  async getUnique(id: string): Promise<PrismaOrder> {
    const orders = await prisma.order.findUnique({
      where: {
        id
      }
    })

    return orders
  }

  async get(filters: IFilters): Promise<PrismaOrder[]> {
    const orders = await prisma.order.findMany({
      take: 60,
      orderBy: {
        date: "desc"
      },
      where: {
        AND: [
          {
            cod: { equals: filters?.code }
          },
          {
            address: { contains: filters?.address }
          },
          {
            customerName: { equals: filters?.customerName }
          },
          {
            delivery: { equals: filters?.delivery }
          },
          {
            phone: { contains: filters?.phone }
          },
          {
            description: { contains: filters?.description }
          },
          {
            payment: { equals: filters?.payment }
          },
          {
            id: { equals: filters?.id }
          },
          {
            vendor: { equals: filters?.vendor }
          },
          {
            title: { contains: filters?.title }
          },
          {
            color: { equals: filters?.color }
          },
          {
            date: {
              gte: filters?.timeInterval?.initialDate,
              lt: `${filters?.timeInterval?.finalDate}T23:59:59`
            }
          }
        ]
      }
    })

    return orders
  }

  async save(orders: Order[]): Promise<void> {
    const ordersObjectsArray = []

    orders.map(order => {
      return ordersObjectsArray.push({
        vendor: order.Vendor.value,
        address: order.Address.value,
        cod: order.Cod.value,
        customerName: order.CustomerName.value,
        date: order.Date,
        delivery: order.Delivery.value,
        description: order.Description,
        payment: order.Payment.value,
        phone: order.Phone.value,
        total: order.Total,
        comments: order.Comments,
        fileNames: order.Files.fileUrls,
        fileKeys: order.Files.fileKeys,
        fileSizes: order.Files.fileSizes,
        id: order.id.toHexString(),
        title: order.Title.value,
        color: order.Color
      })
    })

    await prisma.order.createMany({
      data: ordersObjectsArray
    })
  }

  async update(order: Order, deletedFiles: string[]): Promise<void> {
    const s3 = new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
      },
      region: process.env.AWS_DEFAULT_REGION
    })

    deletedFiles.forEach(file => {
      s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: file
      })
        .promise()
        .then(resp => resp)
    })

    await prisma.order.update({
      where: {
        id: order.id.toHexString()
      },
      data: {
        vendor: order.Vendor.value,
        address: order.Address.value,
        cod: order.Cod.value,
        customerName: order.CustomerName.value,
        delivery: order.Delivery.value,
        description: order.Description,
        payment: order.Payment.value,
        phone: order.Phone.value,
        total: order.Total,
        comments: order.Comments,
        color: order.Color,
        fileKeys: order.Files.fileUrls,
        fileNames: order.Files.fileKeys,
        fileSizes: order.Files.fileSizes,
        title: order.Title.value,
        date: order.Date
      }
    })
  }

  async delete(orderIds: IOrderId[]): Promise<void> {
    const s3 = new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
      },
      region: process.env.AWS_DEFAULT_REGION
    })

    const orderFiles = await prisma.order.findMany({
      where: {
        OR: orderIds
      },
      select: { fileNames: true }
    })

    await orderFiles.forEach(files => {
      files.fileNames.forEach(file => {
        s3.deleteObject({
          Bucket: process.env.AWS_BUCKET,
          Key: file
        })
          .promise()
          .then(resp => resp)
      })
    })

    await prisma.order.deleteMany({
      where: {
        OR: orderIds
      }
    })
  }

  async count(): Promise<number> {
    const numberOfOrders = await prisma.order.count()
    return numberOfOrders
  }
}
