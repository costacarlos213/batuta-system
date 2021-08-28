"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRepository = void 0;
const prisma_1 = require("src/database/prisma");
class VendorRepository {
    async get(email) {
        const vendor = await prisma_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        return vendor;
    }
    async save(vendor) {
        const alreadyExists = await this.alreadyExists(vendor.Email.value);
        if (alreadyExists)
            throw new Error("User already exists.");
        await prisma_1.prisma.user.create({
            data: {
                email: vendor.Email.value,
                name: vendor.Name.value,
                password: vendor.Password,
                value: vendor.Value,
                id: vendor.id.toHexString()
            }
        });
    }
    async alreadyExists(email) {
        const alreadyExists = await prisma_1.prisma.user.findUnique({
            where: {
                email
            },
            rejectOnNotFound: false
        });
        if (!alreadyExists) {
            return false;
        }
        return true;
    }
}
exports.VendorRepository = VendorRepository;
