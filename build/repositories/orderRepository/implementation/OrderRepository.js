"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const prisma_1 = require("src/database/prisma");
class OrderRepository {
    async save(order) {
        await prisma_1.prisma.order.create({
            data: {
                address: order.Address.value,
                cod: order.Cod.value,
                customerName: order.CustomerName.value,
                date: order.Date,
                delivery: order.Delivery.value,
                description: order.Description.value,
                payment: order.Payment.value,
                phone: order.Phone.value,
                total: order.Total,
                comments: order.Comments,
                id: order.id.toHexString()
            }
        });
    }
}
exports.OrderRepository = OrderRepository;
