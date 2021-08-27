import { ObjectId } from "bson"
import { Order } from "src/entities/Order/Order"
import { IOrderRepository } from "src/repositories/orderRepository/IOrderRepository"
import { IVendorRepository } from "src/repositories/userRepository/IVendorRepository"
import { ICreateOrderDTO } from "./CreateOrderDTO"

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private vendorRepository: IVendorRepository
  ) {}

  async execute(orderData: ICreateOrderDTO): Promise<void> {
    const {
      cod,
      customerName,
      description,
      payment,
      phone,
      total,
      vendor,
      delivery,
      address
    } = orderData

    if (
      !cod ||
      !customerName ||
      !description ||
      !payment ||
      !phone ||
      !total ||
      !vendor ||
      !delivery ||
      !address
    ) {
      throw new Error("Missing Params")
    }

    const id = new ObjectId()

    const order = Order.create({
      cod,
      customerName,
      description,
      payment,
      phone,
      vendor,
      total,
      address,
      delivery,
      id
    })

    await this.orderRepository.save(order)
  }
}
