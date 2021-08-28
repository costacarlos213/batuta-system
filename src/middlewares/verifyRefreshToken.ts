import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"

export async function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) return res.status(401).json({ message: "Missing token." })

  try {
    const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    req.body = {
      ...req.body,
      userData: decoded,
      refreshToken
    }

    const tokenRepository = new TokenRepository()

    const storedToken = await tokenRepository.get(decoded.sub.toString())

    if (!storedToken) {
      return res.status(401).json({ message: "Refresh token isn't stored." })
    }

    if (JSON.parse(storedToken).token !== refreshToken)
      return res.status(401).json({ message: "Wrong refresh token." })

    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid session", data: error.message })
  }
}
