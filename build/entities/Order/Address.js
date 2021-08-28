"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    constructor(_address) {
        this._address = _address;
    }
    get value() {
        return this._address;
    }
    static create(address) {
        const isValid = this.validate(address);
        if (!isValid)
            throw new Error("Invalid Address");
        return new Address(address.trim());
    }
    static validate(address) {
        if (!address) {
            return false;
        }
        if (typeof address !== "string")
            return false;
        const trimmedAddress = address.trim();
        if (trimmedAddress.length < 2 || trimmedAddress.length > 255) {
            return false;
        }
        const tester = /[" X"a-zA-Z\d,-]+/gs;
        if (!tester.test(trimmedAddress))
            return false;
        return true;
    }
}
exports.Address = Address;
