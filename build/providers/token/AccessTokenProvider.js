"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function generateAccessToken(userId) {
    const accessToken = jsonwebtoken_1.sign({ sub: userId }, process.env.JWT_AUTH_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TIME
    });
    return accessToken;
}
exports.generateAccessToken = generateAccessToken;
