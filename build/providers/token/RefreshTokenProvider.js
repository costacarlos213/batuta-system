"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function generateRefreshToken(userId) {
    const refreshToken = jsonwebtoken_1.sign({ sub: userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TIME
    });
    return refreshToken;
}
exports.generateRefreshToken = generateRefreshToken;
