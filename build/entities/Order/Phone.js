"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
class Phone {
    constructor(_phoneNumber) {
        this._phoneNumber = _phoneNumber;
    }
    static create(phone) {
        const isValid = this.validate(phone);
        if (!isValid)
            throw new Error("Invalid Phone");
        return new Phone(phone.trim());
    }
    get value() {
        return this._phoneNumber;
    }
    static validate(phone) {
        if (!phone) {
            return false;
        }
        if (phone.length === 0) {
            return false;
        }
        const cleanPhone = phone.replace(/[\s().-]+/g, "");
        const tester = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
        if (!tester.test(cleanPhone)) {
            return false;
        }
        return true;
    }
}
exports.Phone = Phone;
