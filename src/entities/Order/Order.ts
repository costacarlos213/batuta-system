import { ObjectId } from "bson"
import dayjs from "dayjs"
import { StringType } from "../StringType"
import { Address } from "./Address"
import { Code } from "./Code"
import { CPF } from "./CPF"
import { IOrder } from "./IOrder"
import { Phone } from "./Phone"

export class Order {
  private readonly _id: ObjectId
  public readonly Date: string

  private constructor(
    public readonly Vendor: StringType,
    public readonly Cod: Code,
    public readonly CustomerName: StringType,
    public readonly Description: StringType,
    public readonly Total: number,
    public readonly Delivery: StringType,
    public readonly Payment: StringType,
    public readonly Address: Address,
    public readonly Phone: Phone,
    public readonly CPF?: CPF,
    public readonly Comments?: string,
    date?: string,
    id?: ObjectId
  ) {
    if (id) {
      this._id = id
    } else {
      this._id = new ObjectId()
    }

    if (date) {
      this.Date = date
    } else {
      this.Date = dayjs().toISOString()
    }
  }

  get id(): ObjectId {
    return this._id
  }

  static create(orderData: IOrder): Order {
    const {
      cod,
      customerName,
      vendor,
      date,
      delivery,
      description,
      total,
      comments,
      address,
      payment,
      phone,
      cpf,
      id
    } = orderData

    if (
      !cod ||
      !customerName ||
      !vendor ||
      !delivery ||
      !description ||
      !total ||
      !address ||
      !payment ||
      !phone
    ) {
      throw new Error("Missing create options")
    }

    const formatedCustomerName = StringType.create(customerName.trim())
    const formatedDescription = StringType.create(description.trim())
    const formatedDelivery = StringType.create(delivery.trim())
    const formatedVendor = StringType.create(vendor.trim())
    const formatedAddress = Address.create(address.trim())
    const formatedPayment = StringType.create(payment.trim())
    const formatedPhone = Phone.create(phone.trim())
    const formatedCode = Code.create(cod.trim())
    let formatedCpf: CPF

    if (cpf) {
      formatedCpf = CPF.create(cpf)
    }

    return new Order(
      formatedVendor,
      formatedCode,
      formatedCustomerName,
      formatedDescription,
      total,
      formatedDelivery,
      formatedPayment,
      formatedAddress,
      formatedPhone,
      formatedCpf,
      comments,
      date,
      id
    )
  }
}
