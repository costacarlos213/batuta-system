import { Request, Response } from "express"
import { LoginUseCase } from "src/useCases/login/LoginUseCase"
import { ILoginDTO } from "src/useCases/login/LoginUseCaseDTO"

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const loginFields: ILoginDTO = req.body

    try {
      const login = await this.loginUseCase.execute(loginFields)

      return res.status(200).json(login)
    } catch (error) {
      return res.status(401).json({
        message: error.message
      })
    }
  }
}
