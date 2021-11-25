import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"

export async function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const refreshToken = req.cookies.JID

  if (!refreshToken) return res.status(401).json({ message: "Missing token." })

  try {
    const decoded = await verify(
      refreshToken.toString(),
      process.env.JWT_REFRESH_SECRET
    )

    req.body = {
      ...req.body,
      userData: decoded,
      refreshToken
    }

    const tokenRepository = new TokenRepository()

    const storedToken = await tokenRepository.get(decoded.sub.toString())

    if (!storedToken) {
      console.log("refresh token isnt stored")
      return res.status(401).json({ message: "Refresh token isn't stored." })
    }

    if (JSON.parse(storedToken).token !== refreshToken) {
      console.log("wrong refresh token")
      return res.status(401).json({ message: "Wrong refresh token." })
    }

    next()
  } catch (error) {
    console.log(error)

    return res
      .status(401)
      .json({ message: "Invalid session", data: error.message })
  }
}