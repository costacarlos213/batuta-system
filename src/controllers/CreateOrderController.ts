import { Request, Response } from "express"
import { CreateOrderUseCase } from "../useCases/createOrder/CreateOrderUseCase"

export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const orderData = req.body.orders

    if (!orderData) {
      console.log("missing data")

      return res.status(400).json({
        message: "Missing Data"
      })
    }

    try {
      console.log("Creating...")

      await this.createOrderUseCase.execute({
        ...orderData,
        files: req.files
      })

      return res.status(201).json({
        message: "Order has been created."
      })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({
        message: error.message
      })
    }
  }
}