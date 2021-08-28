"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderUseCase = void 0;
const bson_1 = require("bson");
const Order_1 = require("src/entities/Order/Order");
class CreateOrderUseCase {
    constructor(orderRepository, vendorRepository) {
        this.orderRepository = orderRepository;
        this.vendorRepository = vendorRepository;
    }
    async execute(orderData) {
        const { cod, customerName, description, payment, phone, total, vendor, delivery, address } = orderData;
        if (!cod ||
            !customerName ||
            !description ||
            !payment ||
            !phone ||
            !total ||
            !vendor ||
            !delivery ||
            !address) {
            throw new Error("Missing Params");
        }
        const id = new bson_1.ObjectId();
        const order = Order_1.Order.create({
            cod,
            customerName,
            description,
            payment,
            phone,
            vendor,
            total,
            address,
            delivery,
            id
        });
        await this.orderRepository.save(order);
    }
}
exports.CreateOrderUseCase = CreateOrderUseCase;
