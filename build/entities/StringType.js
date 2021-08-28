"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringType = void 0;
class StringType {
    constructor(_name) {
        this._name = _name;
    }
    static create(name) {
        const isValid = this.validate(name);
        if (!isValid)
            throw new Error("Invalid String");
        const cleanName = name.replace(/[^a-zA-Z ]/g, "");
        return new StringType(cleanName);
    }
    get value() {
        return this._name;
    }
    static validate(name) {
        if (!name) {
            return false;
        }
        if (typeof name !== "string") {
            return false;
        }
        const trimmedName = name.trim();
        if (trimmedName.length < 2 || trimmedName.length > 255) {
            return false;
        }
        return true;
    }
}
exports.StringType = StringType;
