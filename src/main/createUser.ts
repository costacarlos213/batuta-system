import { CreateUserController } from "src/controllers/CreateUserController"
import { VendorRepository } from "src/repositories/userRepository/implementation/VendorRepository"
import { CreateUserUseCase } from "src/useCases/createUser/CreateUserUseCase"

function createUserControllerFactory() {
  const userRepository = new VendorRepository()

  const createUserUseCase = new CreateUserUseCase(userRepository)

  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}

const createUserController = createUserControllerFactory()

export { createUserController }
