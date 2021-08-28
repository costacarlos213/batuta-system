import { verify } from "jsonwebtoken"
import { generateAccessToken } from "src/providers/token/AccessTokenProvider"
import { ITokenRepository } from "src/repositories/tokenRepository/ITokenRepository"
import { IRefreshTokenDTO } from "./RefreshTokenUseCaseDTO"

export class RefreshTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(userData: IRefreshTokenDTO): Promise<string> {
    const { refreshToken, userId, token } = userData

    if (!userId || !token || !refreshToken) {
      throw new Error("Missing token or userId.")
    }

    const decoded = await verify(token, process.env.JWT_AUTH_SECRET)

    if (decoded.sub !== userId) {
      throw new Error("Wrong refresh token")
    }

    const accessToken = generateAccessToken(userId)

    this.tokenRepository.set({
      key: "BL_" + userId,
      value: JSON.stringify({ token: token })
    })

    return accessToken
  }
}
