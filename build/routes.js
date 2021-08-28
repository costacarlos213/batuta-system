"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const createOrder_1 = require("./main/createOrder");
const createUser_1 = require("./main/createUser");
const login_1 = require("./main/login");
const router = express_1.Router();
exports.router = router;
router.post("/user", async (req, res) => {
    return await createUser_1.createUserController.handle(req, res);
});
router.post("/order", async (req, res) => {
    return await createOrder_1.createOrderController.handle(req, res);
});
router.post("/login", async (req, res) => {
    return await login_1.loginController.handle(req, res);
});
