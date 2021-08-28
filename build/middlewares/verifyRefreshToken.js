"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const TokenRepository_1 = require("../repositories/tokenRepository/implementation/TokenRepository");
async function verifyRefreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ message: "Missing token." });
    try {
        const decoded = jsonwebtoken_1.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        req.body = Object.assign(Object.assign({}, req.body), { userData: decoded, refreshToken });
        const tokenRepository = new TokenRepository_1.TokenRepository();
        const storedToken = await tokenRepository.get(decoded.sub.toString());
        if (!storedToken) {
            return res.status(401).json({ message: "Refresh token isn't stored." });
        }
        if (JSON.parse(storedToken).token !== refreshToken)
            return res.status(401).json({ message: "Wrong refresh token." });
        next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ message: "Invalid session", data: error.message });
    }
}
exports.verifyRefreshToken = verifyRefreshToken;
