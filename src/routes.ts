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
import { deleteVendorController } from "./main/deleteVendor"
import { updateVendorController } from "./main/updateVendor"

const router = Router()

// User routes

router.post("/user", verifyToken, async (req: Request, res: Response) => {
  return await createUserController.handle(req, res)
})

router.get("/user", verifyToken, async (req: Request, res: Response) => {
  return await getNamesController.handle(req, res)
})

router.put("/user", verifyToken, async (req: Request, res: Response) => {
  return await updateVendorController.handle(req, res)
})

router.delete("/user", verifyToken, async (req: Request, res: Response) => {
  return await deleteVendorController.handle(req, res)
})

// Order Routes

router.post(
  "/order",
  [verifyToken, uploadFileMiddleware],
  async (req: Request, res: Response) => {
    return await createOrderController.handle(req, res)
  }
)

router.get("/order", verifyToken, async (req, res) => {
  return await getOrdersController.handle(req, res)
})

router.get("/order/count", verifyToken, async (req, res) => {
  return await countOrdersController.handle(res)
})

router.put("/order", [verifyToken, uploadFileMiddleware], async (req, res) => {
  return await updateOrderController.handle(req, res)
})

router.delete("/order", verifyToken, async (req, res) => {
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

// PDF Routes

router.post("/print", verifyToken, async (req, res) => {
  return await printSimpleController.handle(req, res)
})

export { router }
