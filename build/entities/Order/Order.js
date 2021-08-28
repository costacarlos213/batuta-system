"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const bson_1 = require("bson");
const dayjs_1 = __importDefault(require("dayjs"));
const StringType_1 = require("../StringType");
const Address_1 = require("./Address");
const Code_1 = require("./Code");
const Phone_1 = require("./Phone");
class Order {
    constructor(Vendor, Cod, CustomerName, Description, Total, Delivery, Payment, Address, Phone, Comments, date, id) {
        this.Vendor = Vendor;
        this.Cod = Cod;
        this.CustomerName = CustomerName;
        this.Description = Description;
        this.Total = Total;
        this.Delivery = Delivery;
        this.Payment = Payment;
        this.Address = Address;
        this.Phone = Phone;
        this.Comments = Comments;
        if (id) {
            this._id = id;
        }
        else {
            this._id = new bson_1.ObjectId();
        }
        if (date) {
            this.Date = date;
        }
        else {
            this.Date = dayjs_1.default().toISOString();
        }
    }
    get id() {
        return this._id;
    }
    static create(orderData) {
        const { cod, customerName, vendor, date, delivery, description, total, comments, address, payment, phone, id } = orderData;
        if (!cod ||
            !customerName ||
            !vendor ||
            !delivery ||
            !description ||
            !total ||
            !address ||
            !payment ||
            !phone) {
            throw new Error("Missing create options");
        }
        const formatedCustomerName = StringType_1.StringType.create(customerName.trim());
        const formatedDescription = StringType_1.StringType.create(description.trim());
        const formatedDelivery = StringType_1.StringType.create(delivery.trim());
        const formatedVendor = StringType_1.StringType.create(vendor.trim());
        const formatedAddress = Address_1.Address.create(address.trim());
        const formatedPayment = StringType_1.StringType.create(payment.trim());
        const formatedPhone = Phone_1.Phone.create(phone.trim());
        const formatedCode = Code_1.Code.create(cod.trim());
        return new Order(formatedVendor, formatedCode, formatedCustomerName, formatedDescription, total, formatedDelivery, formatedPayment, formatedAddress, formatedPhone, comments, date, id);
    }
}
exports.Order = Order;
