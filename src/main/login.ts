import { LoginController } from "src/controllers/LoginController"
import { TokenRepository } from "src/repositories/tokenRepository/implementation/TokenRepository"
import { VendorRepository } from "src/repositories/userRepository/implementation/VendorRepository"
import { LoginUseCase } from "src/useCases/login/LoginUseCase"

function loginControllerFactory() {
  const vendorRepository = new VendorRepository()
  const tokenRepository = new TokenRepository()

  const loginUseCase = new LoginUseCase(vendorRepository, tokenRepository)

  const loginController = new LoginController(loginUseCase)

  return loginController
}

const loginController = loginControllerFactory()

export { loginController }
