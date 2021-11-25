import { Request, Response } from "express"
import { UpdateVendorUseCase } from "../useCases/updateVendor/UpdateVendorUseCase"

export class UpdateVendorController {
  constructor(private updateVendorUseCase: UpdateVendorUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const updateData = req.body

    try {
      await this.updateVendorUseCase.execute(updateData)

      return res.status(200).json()
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}
