import { DeleteVendorController } from "../controllers/DeleteVendorController"
import { VendorRepository } from "../repositories/userRepository/implementation/VendorRepository"
import { DeleteVendorUseCase } from "../useCases/deleteVendor/DeleteVendorUseCase"

function deleteVendorControllerFactory() {
  const vendorRepository = new VendorRepository()

  const deleteVendorUseCase = new DeleteVendorUseCase(vendorRepository)

  const deleteVendorController = new DeleteVendorController(deleteVendorUseCase)

  return deleteVendorController
}

export const deleteVendorController = deleteVendorControllerFactory()
