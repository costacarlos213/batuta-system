import { Pix, Role } from "../../@types/vendor"

interface IVendor {
  name: string
  email?: string
  password?: string
  pixType?: Pix
  pixKey?: string
  role?: Role
}

export interface ICreateUserDTO {
  vendors: IVendor[]
}
