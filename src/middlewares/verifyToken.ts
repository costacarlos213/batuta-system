import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { Role } from "../@types/vendor"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const authToken = req.headers.authorization

    if (!authToken) {
      console.log("missing authToken")
      console.log(req.headers.authorization)
      return res.status(401).json({
        message: "Invalid Session",
        data: "Missing access token"
      })
    }

    const token = req.headers.authorization.split(" ")[1]

    const decoded = (await verify(
      token.trim(),
      process.env.JWT_AUTH_SECRET
    )) as { sub: string; role: Role }

    req.headers.token = token
    req.body.userData = decoded

    if (decoded.role === "vendor") {
      return res.status(401).json({ message: "Invalid vendor operation" })
    }

    const tokenRepository = new TokenRepository()

    const blacklistedToken = await tokenRepository.get(
      "BL_" + decoded.sub.toString()
    )

    if (blacklistedToken) {
      if (JSON.parse(blacklistedToken).token === token) {
        return res
          .status(401)
          .json({ message: "Trying to login with blacklisted token" })
      }
    }

    next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Session",
      data: error.message
    })
  }
}
