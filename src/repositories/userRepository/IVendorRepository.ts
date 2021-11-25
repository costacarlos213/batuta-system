import { User } from "@prisma/client"
import { IVendorInfo } from "../../useCases/getNames/GetNamesUseCase"
import { Vendor } from "../../entities/Vendor/Vendor"
import { IGetUserDTO } from "../../useCases/getNames/GetUserDTO"

export interface IVendorId {
  id: string
}

export interface IVendorRepository {
  save(vendor: Vendor[]): Promise<void>
  get(email: string): Promise<User>
  getNames(filter?: IGetUserDTO): Promise<IVendorInfo[]>
  delete(vendorIds: IVendorId[]): Promise<void>
  update(vendor: Vendor): Promise<void>
}
