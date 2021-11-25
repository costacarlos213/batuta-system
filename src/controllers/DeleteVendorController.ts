import { Request, Response } from "express"
import { DeleteVendorUseCase } from "../useCases/deleteVendor/DeleteVendorUseCase"

export class DeleteVendorController {
  constructor(private deleteVendorUseCase: DeleteVendorUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const vendorIds = req.body

    if (vendorIds.userData) {
      delete vendorIds.userData
      delete vendorIds.token
    }

    if (!vendorIds) {
      return res.status(400).json({
        message: "Missing data."
      })
    }

    try {
      await this.deleteVendorUseCase.execute(vendorIds)

      return res.status(200).json({
        message: "Deleted."
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}
