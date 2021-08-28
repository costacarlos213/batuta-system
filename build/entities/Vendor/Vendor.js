"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const bson_1 = require("bson");
const Email_1 = require("./Email");
const StringType_1 = require("../StringType");
class Vendor {
    constructor(Name, Email, Password, Value, id) {
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.Value = Value;
        if (id) {
            this._id = id;
        }
        else {
            this._id = new bson_1.ObjectId();
        }
    }
    get id() {
        return this._id;
    }
    static create(vendorData) {
        const { name, email, password, id, value } = vendorData;
        if (!name || !email || !password || !value) {
            throw new Error("Missing create options");
        }
        const formatedName = StringType_1.StringType.create(name.trim());
        const formatedEmail = Email_1.Email.create(email.trim());
        return new Vendor(formatedName, formatedEmail, password, value, id);
    }
}
exports.Vendor = Vendor;
