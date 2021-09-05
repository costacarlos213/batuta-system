import { Request, Response } from "express"
import { IFilters } from "src/@types/report"
import { GetOrdersUseCase } from "src/useCases/getOrders/getOrdersUseCase"

export class GetOrdersController {
  constructor(private getOrdersUseCase: GetOrdersUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const filters: IFilters = req.body

    if (!filters) {
      return res.status(400).json({
        message: "Missing filters."
      })
    }

    try {
      const orders = await this.getOrdersUseCase.execute(filters)

      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}
