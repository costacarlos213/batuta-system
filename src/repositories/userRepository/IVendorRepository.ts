import { User } from "@prisma/client"
import { Vendor } from "../../entities/Vendor/Vendor"

export interface IVendorRepository {
  save(vendor: Vendor): Promise<void>
  get(vendorValue: string): Promise<User>
}
