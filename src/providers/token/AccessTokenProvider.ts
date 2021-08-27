import { sign } from "jsonwebtoken"

export function generateAccessToken(userId: string): string {
  const accessToken = sign({ sub: userId }, process.env.JWT_AUTH_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TIME
  })

  return accessToken
}
