"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
class Code {
    constructor(_code) {
        this._code = _code;
    }
    static create(code) {
        const isValid = this.validate(code);
        if (!isValid)
            throw new Error("Invalid Code");
        return new Code(code.trim());
    }
    get value() {
        return this._code;
    }
    static validate(code) {
        if (!code) {
            return false;
        }
        if (code.length !== 4) {
            return false;
        }
        const tester = /^[A-Z]\d+$/s;
        if (!tester.test(code)) {
            return false;
        }
        return true;
    }
}
exports.Code = Code;
