import { sign } from "jsonwebtoken"

export function generateRefreshToken(userId: string): string {
  const refreshToken = sign({ sub: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TIME
  })

  return refreshToken
}
