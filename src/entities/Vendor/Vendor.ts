import { ObjectId } from "bson"
import { Email } from "./Email"
import { IVendor } from "./IVendor"
import { StringType as Name } from "../StringType"

type Role = "admin" | "vendor"

type Pix = "randomKey" | "phone" | "cpf" | "email"

export class Vendor {
  private readonly _id: ObjectId

  private constructor(
    public readonly Name: Name,
    public readonly Email: Email,
    public readonly Password?: string,
    public readonly PixType?: Pix,
    public readonly PixKey?: string,
    public readonly Role?: Role,
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
    const { name, email, password, id, pixKey, pixType, role } = vendorData

    if (!name) {
      throw new Error("Missing name option")
    }

    const formatedName = Name.create(name.trim())
    const formatedEmail = Email.create(email.trim())

    return new Vendor(
      formatedName,
      formatedEmail,
      password,
      pixType,
      pixKey,
      role,
      id
    )
  }
}
