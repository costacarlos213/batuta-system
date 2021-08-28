import { Request, Response } from "express"
import { LogoutUseCase } from "../useCases/logout/logoutUseCase"

export class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.logoutUseCase.execute({
        token: req.body.token,
        userId: req.body.userData.sub
      })

      return res.status(200).json()
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}
