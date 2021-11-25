import {
  IVendorRepository,
  IVendorId
} from "../../repositories/userRepository/IVendorRepository"

export class DeleteVendorUseCase {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(vendorIds: IVendorId[]): Promise<void> {
    await this.vendorRepository.delete(vendorIds)
  }
}
