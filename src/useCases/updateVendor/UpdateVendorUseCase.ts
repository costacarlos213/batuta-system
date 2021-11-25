import { ObjectId } from "bson"
import { Vendor } from "../../entities/Vendor/Vendor"
import { IVendorRepository } from "../../repositories/userRepository/IVendorRepository"
import { IUpdateVendorDTO } from "./UpdateVendorUseCaseDTO"

export class UpdateVendorUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(updateData: IUpdateVendorDTO): Promise<void> {
    const { email, id, name, pixType, pixKey } = updateData

    console.log(pixType)

    if (!email) {
      throw new Error("Email can't be null.")
    }

    if (!name) {
      throw new Error("Name can't be null.")
    }

    if (!id) {
      throw new Error("Missing vendor ID")
    }

    const objectId = new ObjectId(id)

    const newVendor = Vendor.create({
      email,
      name,
      id: objectId,
      pixKey,
      pixType: pixType.length === 0 ? undefined : pixType,
      role: "vendor"
    })

    await this.vendorRepository.update(newVendor)
  }
}
