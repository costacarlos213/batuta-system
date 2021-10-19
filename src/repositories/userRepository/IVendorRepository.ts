import { User } from "@prisma/client"
import { IVendorInfo } from "../../useCases/getNames/GetNamesUseCase"
import { Vendor } from "../../entities/Vendor/Vendor"
import { IGetUserDTO } from "src/useCases/getNames/GetUserDTO"

export interface IVendorRepository {
  save(vendor: Vendor[]): Promise<void>
  get(vendorValue: string): Promise<User>
  getNames(filter?: IGetUserDTO): Promise<IVendorInfo[]>
}
