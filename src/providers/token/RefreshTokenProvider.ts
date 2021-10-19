import { sign } from "jsonwebtoken"
import { Role } from "../../entities/Vendor/IVendor"

export function generateRefreshToken(userId: string, userRole: Role): string {
  const refreshToken = sign(
    { sub: userId, role: userRole },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TIME
    }
  )

  return refreshToken
}
