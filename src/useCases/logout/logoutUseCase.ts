import { ILogoutDTO } from "./logoutUseCaseDTO"
import { ITokenRepository } from "../../repositories/tokenRepository/ITokenRepository"

export class LogoutUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(userData: ILogoutDTO): Promise<void> {
    const { token, userId } = userData

    if (!token || !userId) throw new Error("Missing token or userId")

    this.tokenRepository.del(userId)

    this.tokenRepository.set({
      key: "BL_" + userId,
      value: JSON.stringify({ token })
    })
  }
}
