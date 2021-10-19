import { IVendorRepository } from "../../repositories/userRepository/IVendorRepository"
import { ICreateUserDTO } from "./CreateUserDTO"
import bcrypt from "bcrypt"
import { Vendor } from "../../entities/Vendor/Vendor"
import { ObjectId } from "bson"

export class CreateUserUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(vendorData: ICreateUserDTO): Promise<void | Error> {
    let error: Error

    const userArray = await vendorData.vendors.map(vendor => {
      const { password, name, email, pixKey, pixType } = vendor

      let validPassword = password
      let validEmail = email

      if (!name) {
        error = new Error("Missing Name")
      }

      if (
        pixType !== "randomKey" &&
        pixType !== "phone" &&
        pixType !== "cpf" &&
        pixType !== "email"
      ) {
        error = new Error("Unknown Pix Type")
      }

      if (!validEmail || validEmail.length === 0) {
        validEmail = `${name}${Math.floor(
          Math.random() * 10000 + 1
        )}@batutawind.com`
      }

      if (!validPassword || validPassword.length === 0) {
        validPassword = ""
      }

      const hashPassword = bcrypt.hashSync(validPassword.trim(), 8)
      const id = new ObjectId()

      const newVendor = Vendor.create({
        password: hashPassword,
        email: validEmail,
        pixKey,
        pixType,
        role: "vendor",
        name,
        id
      })

      return newVendor
    })

    if (error) {
      throw error
    }

    await this.vendorRepository.save(userArray)
  }
}
