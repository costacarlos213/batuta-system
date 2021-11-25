import { UpdateVendorController } from "../controllers/UpdateVendorController"
import { VendorRepository } from "../repositories/userRepository/implementation/VendorRepository"
import { UpdateVendorUseCase } from "../useCases/updateVendor/UpdateVendorUseCase"

function updateVendorControllerFactory() {
  const vendorRepository = new VendorRepository()

  const updateVendorUseCase = new UpdateVendorUseCase(vendorRepository)

  const updateVendorController = new UpdateVendorController(updateVendorUseCase)

  return updateVendorController
}

export const updateVendorController = updateVendorControllerFactory()
