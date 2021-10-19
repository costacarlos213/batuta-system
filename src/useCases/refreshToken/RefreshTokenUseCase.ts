import { generateAccessToken } from "../../providers/token/AccessTokenProvider"
import { IRefreshTokenDTO } from "./RefreshTokenUseCaseDTO"

export class RefreshTokenUseCase {
  async execute(userData: IRefreshTokenDTO): Promise<string> {
    const { refreshToken, userId, userRole } = userData

    if (!userId || !refreshToken || !userRole) {
      throw new Error("Missing token or userId.")
    }

    const accessToken = generateAccessToken(userId, userRole)

    return accessToken
  }
}
