import { LoginController } from "src/controllers/LoginController"
import { VendorRepository } from "src/repositories/userRepository/implementation/VendorRepository"
import { LoginUseCase } from "src/useCases/login/LoginUseCase"

function loginControllerFactory() {
  const vendorRepository = new VendorRepository()

  const loginUseCase = new LoginUseCase(vendorRepository)

  const loginController = new LoginController(loginUseCase)

  return loginController
}

const loginController = loginControllerFactory()

export { loginController }
