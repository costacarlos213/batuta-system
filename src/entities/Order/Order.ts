import { ObjectId } from "bson"
import dayjs from "dayjs"
import { StringType } from "../StringType"
import { Address } from "./Address"
import { Code } from "./Code"
import { AllowedColors, IFilesInfo, IOrder } from "./IOrder"
import { Phone } from "./Phone"

export class Order {
  private readonly _id: ObjectId
  public readonly Date: string

  private constructor(
    public readonly Vendor: StringType,
    public readonly Cod: Code,
    public readonly CustomerName: StringType,
    public readonly Description: string,
    public readonly Total: number,
    public readonly Delivery: StringType,
    public readonly Payment: StringType,
    public readonly Address: Address,
    public readonly Phone: Phone,
    public readonly Files: IFilesInfo,
    public readonly Color: AllowedColors,
    public readonly Title: StringType,
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
      id,
      color,
      title,
      files
    } = orderData

    if (description.trim().length < 2 || description.trim().length > 250) {
      throw new Error("Invalid description")
    }

    const formatedCustomerName = StringType.create(customerName.trim())
    const formatedDelivery = StringType.create(delivery.trim())
    const formatedVendor = StringType.create(vendor.trim())
    const formatedAddress = Address.create(address.trim())
    const formatedPayment = StringType.create(payment.trim())
    const formatedTitle = StringType.create(title.trim())
    const formatedPhone = Phone.create(phone.trim())
    const formatedCode = Code.create(cod.trim())

    return new Order(
      formatedVendor,
      formatedCode,
      formatedCustomerName,
      description,
      total,
      formatedDelivery,
      formatedPayment,
      formatedAddress,
      formatedPhone,
      files,
      color,
      formatedTitle,
      comments,
      date,
      id
    )
  }
}
