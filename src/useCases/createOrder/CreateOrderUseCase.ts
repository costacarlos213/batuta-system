import { ObjectId } from "bson"
import { AllowedColors } from "src/entities/Order/IOrder"
import { Order } from "src/entities/Order/Order"
import { IOrderRepository } from "src/repositories/orderRepository/IOrderRepository"
import { ITokenRepository } from "src/repositories/tokenRepository/ITokenRepository"
import { ICreateOrderDTO } from "./CreateOrderDTO"

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private tokenRepository: ITokenRepository
  ) {}

  async execute(orderData: ICreateOrderDTO): Promise<void> {
    const {
      customerName,
      description,
      payment,
      phone,
      total,
      vendor,
      delivery,
      address,
      title,
      files,
      color
    } = orderData

    if (
      !customerName ||
      !description ||
      !payment ||
      !phone ||
      !total ||
      !vendor ||
      !delivery ||
      !address ||
      !files ||
      !title ||
      !color
    ) {
      throw new Error("Missing Params")
    }

    const orders = []

    if (typeof orderData.customerName === "string") {
      const id = new ObjectId()

      const fileNames = files.map(file => {
        return file.key
      })

      const fileUrl = files.map(file => {
        return file.location
      })

      const code = await this.tokenRepository.get("code")
      const newCode = (parseInt(code) + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 3,
        useGrouping: false
      })
      const orderCod = `${orderData.vendor?.toString()[0]}${newCode}`

      orders.push(
        Order.create({
          cod: orderCod,
          customerName: orderData.customerName?.toString(),
          description: orderData.description?.toString(),
          payment: orderData.payment?.toString(),
          phone: orderData.phone?.toString(),
          vendor: orderData.vendor?.toString(),
          total: parseFloat(orderData.total?.toString()),
          address: orderData.address?.toString(),
          delivery: orderData.delivery?.toString(),
          comments: orderData.comments?.toString(),
          color: orderData.color as AllowedColors,
          title: orderData.title?.toString(),
          files: {
            fileKeys: fileUrl,
            fileUrls: fileNames
          },
          id
        })
      )

      this.tokenRepository.set({
        key: "code",
        value: newCode.toString()
      })
    } else if (typeof orderData.customerName === "object") {
      for (let i = 0; i < orderData.customerName.length; i++) {
        const id = new ObjectId()

        const fileNames = []
        const fileKeys = []

        files.forEach(file => {
          const fileFieldIndex = file.fieldname.slice(7).split("_")[1]

          if (fileFieldIndex === i.toString()) {
            fileNames.push(file.key)
            fileKeys.push(file.location)
          }
        })

        const code = await this.tokenRepository.get("code")
        const newCode = (parseInt(code) + 1).toLocaleString("en-US", {
          minimumIntegerDigits: 3,
          useGrouping: false
        })
        const orderCod = `${orderData.vendor?.toString()[0]}${newCode}`

        orders.push(
          Order.create({
            cod: orderCod,
            customerName: orderData.customerName[i],
            description: orderData.description[i],
            payment: orderData.payment[i],
            phone: orderData.phone[i],
            vendor: orderData.vendor[i],
            total: parseFloat(orderData.total[i]),
            address: orderData.address[i],
            delivery: orderData.delivery[i],
            comments: orderData.comments[i],
            color: orderData.color[i] as AllowedColors,
            title: orderData.title[i],
            files: {
              fileKeys,
              fileUrls: fileNames
            },
            id
          })
        )

        this.tokenRepository.set({
          key: "code",
          value: newCode.toString()
        })
      }
    } else {
      throw new Error("Invalid form")
    }

    await this.orderRepository.save(orders)
  }
}
