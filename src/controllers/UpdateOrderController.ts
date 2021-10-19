import { Request, Response } from "express"
import { UpdateOrderUseCase } from "../useCases/updateOrder/UpdateOrderUseCase"

export class UpdateOrderController {
  constructor(private updateOrderUseCase: UpdateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const updateData = req.body

    if (!updateData) {
      return res.status(400).json({
        message: "Missing data"
      })
    }

    if (
      updateData &&
      Object.keys(updateData).length === 0 &&
      (!req.files || req.files.length === 0)
    ) {
      return res.status(304).json("not modified")
    }

    try {
      await this.updateOrderUseCase.execute({
        ...updateData,
        date: updateData.initialDate,
        insertedFiles: req?.files,
        deletedFiles: updateData.deletedFiles
          ? JSON.parse(updateData.deletedFiles)
          : undefined
      })

      return res.status(200).json({
        message: "Updated."
      })
    } catch (error) {
      console.log(error)

      return res.status(400).json({
        message: error.message
      })
    }
  }
}
