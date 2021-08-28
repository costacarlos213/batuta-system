"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Vendor_1 = require("../../entities/Vendor/Vendor");
const bson_1 = require("bson");
class CreateUserUseCase {
    constructor(vendorRepository) {
        this.vendorRepository = vendorRepository;
    }
    async execute(vendorData) {
        const { password, name, email } = vendorData;
        if (!password || !name || !email) {
            throw new Error("Missing params");
        }
        const hashPassword = await bcrypt_1.default.hash(password.trim(), 8);
        const id = new bson_1.ObjectId();
        const value = name.toLowerCase().replace(" ", "-");
        const user = Vendor_1.Vendor.create({
            password: hashPassword,
            email,
            name,
            value,
            id
        });
        await this.vendorRepository.save(user);
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
