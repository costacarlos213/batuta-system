import { prisma } from "src/database/prisma"
import { Vendor } from "../../../entities/Vendor/Vendor"
import { User } from "@prisma/client"
import { IVendorRepository } from "../IVendorRepository"

export class VendorRepository implements IVendorRepository {
  async get(email: string): Promise<User> {
    const vendor = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return vendor
  }

  async save(vendor: Vendor): Promise<void> {
    const alreadyExists = await this.alreadyExists(vendor.Email.value)

    if (alreadyExists) throw new Error("User already exists.")

    await prisma.user.create({
      data: {
        email: vendor.Email.value,
        name: vendor.Name.value,
        password: vendor.Password,
        value: vendor.Value,
        id: vendor.id.toHexString()
      }
    })
  }

  async alreadyExists(email: string): Promise<boolean> {
    const alreadyExists = await prisma.user.findUnique({
      where: {
        email
      },
      rejectOnNotFound: false
    })

    if (!alreadyExists) {
      return false
    }

    return true
  }
}
