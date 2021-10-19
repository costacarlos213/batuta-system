import { Pix } from "../../@types/vendor"
import { IVendorRepository } from "../../repositories/userRepository/IVendorRepository"
import { IGetUserDTO } from "./GetUserDTO"

export interface IVendorInfo {
  id: string
  name: string
  pixType: Pix
  pixKey: string
}

export class GetNamesUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(filter?: IGetUserDTO): Promise<IVendorInfo[]> {
    const names = await this.vendorRepository.getNames({ id: filter.id })

    return names
  }
}
