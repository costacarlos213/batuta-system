import { GetNamesController } from "../controllers/GetNamesController"
import { VendorRepository } from "../repositories/userRepository/implementation/VendorRepository"
import { GetNamesUseCase } from "../useCases/getNames/GetNamesUseCase"

function getNamesControllerFactory() {
  const vendorRepository = new VendorRepository()

  const getNamesUseCase = new GetNamesUseCase(vendorRepository)

  const getNamesController = new GetNamesController(getNamesUseCase)

  return getNamesController
}

export const getNamesController = getNamesControllerFactory()
