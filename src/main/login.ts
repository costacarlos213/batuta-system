import { LoginController } from "../controllers/LoginController"
import { TokenRepository } from "../repositories/tokenRepository/implementation/TokenRepository"
import { VendorRepository } from "../repositories/userRepository/implementation/VendorRepository"
import { LoginUseCase } from "../useCases/login/LoginUseCase"

function loginControllerFactory() {
  const vendorRepository = new VendorRepository()
  const tokenRepository = new TokenRepository()

  const loginUseCase = new LoginUseCase(vendorRepository, tokenRepository)

  const loginController = new LoginController(loginUseCase)

  return loginController
}

const loginController = loginControllerFactory()

export { loginController }
