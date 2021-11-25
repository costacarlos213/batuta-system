import { Request, Response } from "express"
import { GetNamesUseCase } from "../useCases/getNames/GetNamesUseCase"

export class GetNamesController {
  constructor(private getNamesUseCase: GetNamesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const filter = {
      id: req.query.id?.toString()
    }

    try {
      const names = await this.getNamesUseCase.execute(filter)

      return res.status(200).json(names)
    } catch (error) {
      console.log(error)

      return res.status(500).json({
        message: error.message
      })
    }
  }
}
