import { Pix } from "@prisma/client"

export interface IUpdateVendorDTO {
  id: string
  email: string
  pixKey?: string
  pixType?: Pix
  name: string
}
