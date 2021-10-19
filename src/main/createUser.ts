import { CreateUserController } from "../controllers/CreateUserController"
import { VendorRepository } from "../repositories/userRepository/implementation/VendorRepository"
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase"

function createUserControllerFactory() {
  const userRepository = new VendorRepository()

  const createUserUseCase = new CreateUserUseCase(userRepository)

  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}

const createUserController = createUserControllerFactory()

export { createUserController }
