import { Request, Response } from "express"
import { ICreateOrderDTO } from "src/useCases/createOrder/CreateOrderDTO"
import { CreateOrderUseCase } from "src/useCases/createOrder/CreateOrderUseCase"

export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const orderData: ICreateOrderDTO = req.body

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
