import { Role } from "../../@types/vendor"

export interface IRefreshTokenDTO {
  refreshToken: string
  userId: string
  userRole: Role
}
