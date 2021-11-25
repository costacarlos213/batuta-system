import { ObjectId } from "bson"
import { IVendorRepository } from "../../repositories/userRepository/IVendorRepository"
import { AllowedColors } from "../../entities/Order/IOrder"
import { Order } from "../../entities/Order/Order"
import { IOrderRepository } from "../../repositories/orderRepository/IOrderRepository"
import { ITokenRepository } from "../../repositories/tokenRepository/ITokenRepository"
import { ICreateOrderDTO } from "./CreateOrderDTO"

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private vendorRepository: IVendorRepository,
    private tokenRepository: ITokenRepository
  ) {}

  async execute(orderData: ICreateOrderDTO): Promise<void> {
    const { files } = orderData

    console.log(orderData)

    const orders = []

    if (typeof orderData.vendorId === "string") {
      const id = new ObjectId()

      const fileNames = files.map(file => {
        return file.key
      })

      const fileUrl = files.map(file => {
        return file.location
      })

      const fileSizes = files.map(file => {
        return file.size
      })

      if (
        !orderData.vendorId ||
        orderData.vendorId === "" ||
        orderData.vendorId === "undefined"
      ) {
        throw new Error("Invalid Code")
      }

      const vendor = await this.vendorRepository.getNames({
        id: orderData.vendorId
      })

      if (!vendor) {
        throw new Error("Invalid Code")
      }

      const code = await this.tokenRepository.get("code")
      const newCode = (parseInt(code) + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 4,
        useGrouping: false
      })
      const orderCod = `${vendor[0].name[0]}${newCode}`

      let total = orderData.total

      if (total === "" || !total || total.length === 0) {
        total = "0"
      }

      orders.push(
        Order.create({
          cod: orderCod,
          customerName: orderData.customerName as string | undefined,
          description: orderData.description as string | undefined,
          payment: orderData.payment as string | undefined,
          phone: orderData.phone as string | undefined,
          vendorId: orderData.vendorId as string,
          total: parseFloat(total as string),
          address: orderData.address as string | undefined,
          delivery: orderData.delivery as string | undefined,
          comments: orderData.comments as string | undefined,
          color: orderData.color as AllowedColors | undefined,
          title: orderData.title as string | undefined,
          files: {
            fileKeys: fileUrl,
            fileUrls: fileNames,
            fileSizes
          },
          id
        })
      )

      this.tokenRepository.set({
        key: "code",
        value: newCode.toString()
      })
    } else if (typeof orderData.vendorId === "object") {
      for (let i = 0; i < orderData.vendorId.length; i++) {
        const id = new ObjectId()

        const fileNames = []
        const fileKeys = []
        const fileSizes = []

        if (
          !orderData.vendorId[i] ||
          orderData.vendorId[i] === "" ||
          orderData.vendorId[i] === "undefined"
        ) {
          throw new Error("Invalid Code")
        }

        const vendor = await this.vendorRepository.getNames({
          id: orderData.vendorId[i]
        })

        if (!vendor) {
          throw new Error("Invalid Code")
        }

        files.forEach(file => {
          const fileFieldIndex = file.fieldname.slice(7).split("_")[1]

          if (fileFieldIndex === i.toString()) {
            fileNames.push(file.key)
            fileKeys.push(file.location)
            fileSizes.push(file.size)
          }
        })

        const code = await this.tokenRepository.get("code")
        const newCode = (parseInt(code) + 1).toLocaleString("en-US", {
          minimumIntegerDigits: 4,
          useGrouping: false
        })
        const orderCod = `${vendor[0].name[0]}${newCode}`

        let total = orderData.total[i]

        if (total === "" || !total || total.length === 0) {
          total = "0"
        }

        orders.push(
          Order.create({
            cod: orderCod,
            customerName: orderData.customerName[i],
            description: orderData.description[i],
            payment: orderData.payment[i],
            phone: orderData.phone[i],
            vendorId: orderData.vendorId[i],
            total: parseFloat(total),
            address: orderData.address[i],
            delivery: orderData.delivery[i],
            comments: orderData.comments[i],
            color: orderData.color[i] as AllowedColors,
            title: orderData.title[i],
            files: {
              fileKeys,
              fileUrls: fileNames,
              fileSizes
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
