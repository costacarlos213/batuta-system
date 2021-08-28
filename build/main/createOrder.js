"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = void 0;
const CreateOrderController_1 = require("src/controllers/CreateOrderController");
const OrderRepository_1 = require("src/repositories/orderRepository/implementation/OrderRepository");
const VendorRepository_1 = require("src/repositories/userRepository/implementation/VendorRepository");
const CreateOrderUseCase_1 = require("src/useCases/createOrder/CreateOrderUseCase");
function createOrderControllerFactory() {
    const orderRepository = new OrderRepository_1.OrderRepository();
    const vendorRepository = new VendorRepository_1.VendorRepository();
    const createOrderUseCase = new CreateOrderUseCase_1.CreateOrderUseCase(orderRepository, vendorRepository);
    const createOrderController = new CreateOrderController_1.CreateOrderController(createOrderUseCase);
    return createOrderController;
}
exports.createOrderController = createOrderControllerFactory();
