import { Request, Response } from "express"
import { PrintSimpleUseCase } from "../useCases/printSimple/PrintSimpleUseCase"

export class PrintSimpleController {
  constructor(private printSimpleUseCase: PrintSimpleUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    if (!req.body.printArray || !req.body.type) {
      return res.status(400).json({
        message: "Missing params."
      })
    }

    try {
      const pdf = await this.printSimpleUseCase.execute({
        pdfData: req.body.printArray,
        pdfType: req.body.type
      })

      res.set("Content-Type", "application/pdf")

      return res.send(pdf)
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}
