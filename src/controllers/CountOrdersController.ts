import { Response } from "express"
import { CountOrdersUseCase } from "../useCases/countOrders/CountOrdersUseCase"

export class CountOrdersController {
  constructor(private countOrdersUseCase: CountOrdersUseCase) {}

  async handle(res: Response): Promise<Response> {
    try {
      const numberOfOrders = await this.countOrdersUseCase.execute()

      return res.status(200).json({
        quantity: numberOfOrders
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }
}
