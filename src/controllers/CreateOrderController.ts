import { Request, Response } from "express"
import { CreateOrderUseCase } from "src/useCases/createOrder/CreateOrderUseCase"

export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const orderData = req.body
    orderData.total = parseFloat(orderData.total)

    if (!orderData) {
      res.status(400).json({
        message: "Missing Data"
      })
    }

    try {
      await this.createOrderUseCase.execute(orderData)

      return res.status(201).json({
        message: "Order has been created."
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}
