import { Role } from "../../entities/Vendor/IVendor"

export interface IRefreshTokenDTO {
  refreshToken: string
  userId: string
  userRole: Role
}
