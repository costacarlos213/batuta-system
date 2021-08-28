"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AccessTokenProvider_1 = require("src/providers/token/AccessTokenProvider");
class RefreshToken {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async execute(userData) {
        const { refreshToken, userId, token } = userData;
        if (!userId || !token || !refreshToken) {
            throw new Error("Missing token or userId.");
        }
        const decoded = await jsonwebtoken_1.verify(token, process.env.JWT_AUTH_SECRET);
        if (decoded.sub !== userId) {
            throw new Error("Wrong refresh token");
        }
        const accessToken = AccessTokenProvider_1.generateAccessToken(userId);
        this.tokenRepository.set({
            key: "BL_" + userId,
            value: JSON.stringify({ token: token })
        });
        return accessToken;
    }
}
exports.RefreshToken = RefreshToken;
