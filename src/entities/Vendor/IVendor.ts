import { ObjectId } from "bson"

export interface IVendor {
  id?: ObjectId
  name: string
  email: string
  password: string
  value: string
}
