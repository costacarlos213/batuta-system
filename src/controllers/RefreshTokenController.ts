import { Request, Response } from "express"
import { RefreshTokenUseCase } from "src/useCases/refreshToken/RefreshTokenUseCase"

class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const accessToken = await this.refreshTokenUseCase.execute({
        userId: req.body.userData.sub,
        refreshToken: req.body.refreshToken?.toString()
      })

      return res.status(200).json({ accessToken })
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { RefreshTokenController }
