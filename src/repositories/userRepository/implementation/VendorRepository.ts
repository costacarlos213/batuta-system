import { prisma } from "../../../database/prisma"
import { Vendor } from "../../../entities/Vendor/Vendor"
import { User } from "@prisma/client"
import { IVendorRepository } from "../IVendorRepository"
import { IVendorInfo } from "../../../useCases/getNames/GetNamesUseCase"
import { IGetUserDTO } from "src/useCases/getNames/GetUserDTO"

export class VendorRepository implements IVendorRepository {
  async get(email: string): Promise<User> {
    const vendor = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return vendor
  }

  async getNames(filter?: IGetUserDTO): Promise<IVendorInfo[]> {
    const vendors = await prisma.user.findMany({
      select: {
        name: true,
        pixKey: true,
        id: true,
        pixType: true
      },
      where: {
        AND: [{ role: { equals: "vendor" } }, { id: { equals: filter?.id } }]
      }
    })

    return vendors
  }

  async save(vendors: Vendor[]): Promise<void> {
    const formatedVendors = []

    vendors.forEach(async vendor => {
      const alreadyExists = await this.alreadyExists(vendor.Email.value)

      if (alreadyExists)
        throw new Error(`Usuário "${vendor.Name.value}" já existe.`)
    })

    vendors.map(vendor => {
      return formatedVendors.push({
        name: vendor.Name.value,
        email: vendor.Email.value,
        password: vendor.Password,
        pixType: vendor.PixType,
        pixKey: vendor.PixKey,
        role: vendor.Role,
        id: vendor.id.toHexString()
      })
    })

    await prisma.user.createMany({
      data: formatedVendors
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