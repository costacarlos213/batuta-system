"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderController = void 0;
class CreateOrderController {
    constructor(createOrderUseCase) {
        this.createOrderUseCase = createOrderUseCase;
    }
    async handle(req, res) {
        const orderData = req.body;
        if (!orderData) {
            res.status(400).json({
                message: "Missing Data"
            });
        }
        try {
            await this.createOrderUseCase.execute(orderData);
            return res.status(201).json({
                message: "Order has been created."
            });
        }
        catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
}
exports.CreateOrderController = CreateOrderController;
