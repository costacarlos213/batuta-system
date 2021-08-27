import { IVendorRepository } from "src/repositories/userRepository/IVendorRepository"
import { ICreateUserDTO } from "./CreateUserDTO"
import bcrypt from "bcrypt"
import { Vendor } from "../../entities/Vendor/Vendor"
import { ObjectId } from "bson"

export class CreateUserUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(vendorData: ICreateUserDTO): Promise<void> {
    const { password, name, email } = vendorData

    if (!password || !name || !email) {
      throw new Error("Missing params")
    }

    const hashPassword = await bcrypt.hash(password.trim(), 8)
    const id = new ObjectId()

    const value = name.toLowerCase().replace(" ", "-")

    const user = Vendor.create({
      password: hashPassword,
      email,
      name,
      value,
      id
    })

    await this.vendorRepository.save(user)
  }
}
