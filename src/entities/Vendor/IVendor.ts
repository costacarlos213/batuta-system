import { ObjectId } from "bson"
import { Pix, Role } from "../../@types/vendor"

export interface IVendor {
  id?: ObjectId
  name: string
  email: string
  password?: string
  pixType?: Pix
  pixKey?: string
  role?: Role
}
