import { sign } from "jsonwebtoken"
import { Role } from "../../entities/Vendor/IVendor"

export function generateAccessToken(userId: string, userRole: Role): string {
  const accessToken = sign(
    { sub: userId, role: userRole },
    process.env.JWT_AUTH_SECRET,
    {
      expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
    }
  )

  return accessToken
}
