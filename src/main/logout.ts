import { LogoutUseCase } from "../useCases/logout/logoutUseCase"
import { LogoutController } from "../controllers/LogoutController"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"

function LogoutControllerFactory() {
  const tokenRepository = new TokenRepository()

  const logoutUseCase = new LogoutUseCase(tokenRepository)

  const logoutController = new LogoutController(logoutUseCase)

  return logoutController
}

const logoutController = LogoutControllerFactory()

export { logoutController }
