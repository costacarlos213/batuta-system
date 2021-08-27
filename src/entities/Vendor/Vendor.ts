import { ObjectId } from "bson"
import { Email } from "./Email"
import { IVendor } from "./IVendor"
import { StringType as Name } from "../StringType"

export class Vendor {
  private readonly _id: ObjectId

  private constructor(
    public readonly Name: Name,
    public readonly Email: Email,
    public readonly Password: string,
    public readonly Value: string,
    id?: ObjectId
  ) {
    if (id) {
      this._id = id
    } else {
      this._id = new ObjectId()
    }
  }

  get id(): ObjectId {
    return this._id
  }

  static create(vendorData: IVendor): Vendor {
    const { name, email, password, id, value } = vendorData

    if (!name || !email || !password || !value) {
      throw new Error("Missing create options")
    }

    const formatedName = Name.create(name.trim())
    const formatedEmail = Email.create(email.trim())

    return new Vendor(formatedName, formatedEmail, password, value, id)
  }
}
