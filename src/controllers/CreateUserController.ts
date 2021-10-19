import { Request, Response } from "express"
import { ICreateUserDTO } from "../useCases/createUser/CreateUserDTO"
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase"

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const userData: ICreateUserDTO = req.body

    if (!userData) {
      return res.status(400).json({
        message: "Missing data"
      })
    }

    try {
      await this.createUserUseCase.execute(userData)

      return res.status(201).json({
        message: "User has been created."
      })
    } catch (err) {
      return res.status(400).json({
        message: err.message
      })
    }
  }
}
