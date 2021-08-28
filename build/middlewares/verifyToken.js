"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const TokenRepository_1 = require("../repositories/tokenRepository/implementation/TokenRepository");
async function verifyToken(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken)
            throw new Error("Token is missing");
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.verify(token, process.env.JWT_AUTH_SECRET);
        req.body = Object.assign(Object.assign({}, req.body), { userData: decoded, token });
        const tokenRepository = new TokenRepository_1.TokenRepository();
        const blacklistedToken = await tokenRepository.get("BL_" + decoded.sub.toString());
        if (!blacklistedToken) {
            next();
        }
        else {
            if (JSON.parse(blacklistedToken).token === token) {
                return res
                    .status(401)
                    .json({ message: "Trying to login with blacklisted token" });
            }
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid Session",
            data: error.message
        });
    }
}
exports.verifyToken = verifyToken;
