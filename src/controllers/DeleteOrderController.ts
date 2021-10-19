import { Request, Response } from "express"
import { DeleteOrderUseCase } from "../useCases/deleteOrder/DeleteOrderUseCase"

export class DeleteOrderController {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const orderIds = req.body

    if (!orderIds) {
      return res.status(400).json({
        message: "Missing data."
      })
    }

    try {
      await this.deleteOrderUseCase.execute(orderIds)

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
