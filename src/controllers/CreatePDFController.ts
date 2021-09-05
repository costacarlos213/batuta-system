import { Request, Response } from "express"
import { CreatePDFUseCase } from "src/useCases/createPDF/createPDFUseCase"

export class CreatePDFController {
  constructor(private createPDFUseCase: CreatePDFUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    if (!req.body || !req.body.pdfType) {
      return res.status(400).json({
        message: "Missing params."
      })
    }

    try {
      const pdf = await this.createPDFUseCase.execute(req.body)

      res.set("Content-Type", "application/pdf")

      return res.send(pdf)
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}
