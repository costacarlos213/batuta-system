import { Request, Response, Router } from "express"
import { createOrderController } from "./main/createOrder"
import { createUserController } from "./main/createUser"
import { loginController } from "./main/login"

const router = Router()

router.post("/user", async (req: Request, res: Response) => {
  return await createUserController.handle(req, res)
})

router.post("/order", async (req: Request, res: Response) => {
  return await createOrderController.handle(req, res)
})

router.post("/login", async (req: Request, res: Response) => {
  return await loginController.handle(req, res)
})

export { router }
