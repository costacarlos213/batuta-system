import { Request, Response, Router } from "express"
import { createOrderController } from "./main/createOrder"
import { printSimpleController } from "./main/printSimple"
import { createUserController } from "./main/createUser"
import { loginController } from "./main/login"
import { logoutController } from "./main/logout"
import { refreshTokenController } from "./main/refreshToken"
import { verifyRefreshToken } from "./middlewares/verifyRefreshToken"
import { verifyToken } from "./middlewares/verifyToken"
import { getOrdersController } from "./main/getOrders"
import { uploadFileMiddleware } from "./middlewares/uploadFile"
import { updateOrderController } from "./main/updateOrder"
import { deleteOrderController } from "./main/deleteOrder"
import { countOrdersController } from "./main/CountOrders"
import { getNamesController } from "./main/getNames"

const router = Router()

router.post("/user", async (req: Request, res: Response) => {
  return await createUserController.handle(req, res)
})

router.get("/user", async (req: Request, res: Response) => {
  return await getNamesController.handler(req, res)
})

router.post(
  "/order",
  [verifyToken, uploadFileMiddleware],
  async (req: Request, res: Response) => {
    return await createOrderController.handle(req, res)
  }
)

router.get("/order", async (req, res) => {
  return await getOrdersController.handle(req, res)
})

router.get("/order/count", async (req, res) => {
  return await countOrdersController.handle(res)
})

router.put("/order", uploadFileMiddleware, async (req, res) => {
  return await updateOrderController.handle(req, res)
})

router.delete("/order", async (req, res) => {
  return await deleteOrderController.handle(req, res)
})

// Auth routes

router.post("/auth/login", async (req, res) => {
  return await loginController.handle(req, res)
})

router.delete("/auth/logout", verifyToken, async (req, res) => {
  return await logoutController.handle(req, res)
})

router.get("/token", verifyRefreshToken, async (req, res) => {
  return await refreshTokenController.handle(req, res)
})

router.post("/print", verifyToken, async (req, res) => {
  return await printSimpleController.handle(req, res)
})

export { router }
