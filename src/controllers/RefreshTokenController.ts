import { Request, Response } from "express"
import { RefreshTokenUseCase } from "../useCases/refreshToken/RefreshTokenUseCase"

class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      console.log("refreshing token controller...")

      const accessToken = await this.refreshTokenUseCase.execute({
        userId: req.body.userData.sub,
        userRole: req.body.userData.role,
        refreshToken: req.body.refreshToken?.toString()
      })

      res.setHeader("Access-Control-Allow-Origin", "*")

      return res.status(200).json({ accessToken })
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { RefreshTokenController }
