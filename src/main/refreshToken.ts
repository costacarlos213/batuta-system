import { RefreshTokenUseCase } from "../useCases/refreshToken/RefreshTokenUseCase"
import { RefreshTokenController } from "../controllers/RefreshTokenController"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"

function RefreshTokenControllerFactory() {
  const tokenRepository = new TokenRepository()

  const refreshTokenUseCase = new RefreshTokenUseCase(tokenRepository)

  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

  return refreshTokenController
}

const refreshTokenController = RefreshTokenControllerFactory()

export { refreshTokenController }
