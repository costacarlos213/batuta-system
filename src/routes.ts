import { Request, Response, Router } from "express"
import { createOrderController } from "./main/createOrder"
import { createUserController } from "./main/createUser"
import { loginController } from "./main/login"
import { logoutController } from "./main/logout"
import { refreshTokenController } from "./main/refreshToken"
import { verifyRefreshToken } from "./middlewares/verifyRefreshToken"
import { verifyToken } from "./middlewares/verifyToken"

const router = Router()

router.post("/user", async (req: Request, res: Response) => {
  return await createUserController.handle(req, res)
})

router.post("/order", verifyToken, async (req: Request, res: Response) => {
  return await createOrderController.handle(req, res)
})

// Auth routes

router.post("/auth/login", async (req, res) => {
  return await loginController.handle(req, res)
})

router.get("/auth/logout", verifyToken, async (req, res) => {
  return await logoutController.handle(req, res)
})

router.get("/token", verifyRefreshToken, async (req, res) => {
  return await refreshTokenController.handle(req, res)
})

export { router }
