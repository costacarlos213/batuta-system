import { Request, Response } from "express"
import { IFilters } from "../@types/report"
import { GetOrdersUseCase } from "../useCases/getOrders/getOrdersUseCase"

export class GetOrdersController {
  constructor(private getOrdersUseCase: GetOrdersUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const filters: IFilters = {
      id: req.query.id?.toString(),
      address: req.query.address?.toString(),
      code: req.query.cod?.toString(),
      customerName: req.query.customerName?.toString(),
      delivery: req.query.delivery?.toString(),
      description: req.query.description?.toString(),
      payment: req.query.payment?.toString(),
      phone: req.query.phone?.toString(),
      timeInterval: {
        finalDate: req.query.finalDate?.toString(),
        initialDate: req.query.initialDate?.toString()
      },
      vendor: req.query.vendor?.toString(),
      title: req.query.title?.toString(),
      color: req.query.color?.toString() as "green" | "yellow"
    }

    try {
      const orders = await this.getOrdersUseCase.execute(filters)

      return res.status(200).json(orders)
    } catch (error) {
      console.log(error)

      return res.status(500).json({
        message: error.message
      })
    }
  }
}
