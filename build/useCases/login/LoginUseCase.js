"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const AccessTokenProvider_1 = require("src/providers/token/AccessTokenProvider");
const RefreshTokenProvider_1 = require("src/providers/token/RefreshTokenProvider");
class LoginUseCase {
    constructor(vendorRepository, tokenRepository) {
        this.vendorRepository = vendorRepository;
        this.tokenRepository = tokenRepository;
    }
    async execute(loginFields) {
        const { email, password } = loginFields;
        const vendor = await this.vendorRepository.get(email);
        if (!vendor)
            throw new Error("Wrong credentials.");
        const isPasswordValid = await bcrypt_1.compare(password, vendor.password);
        if (!isPasswordValid)
            throw new Error("Wrong credentials.");
        const accessToken = AccessTokenProvider_1.generateAccessToken(vendor.id);
        const refreshToken = RefreshTokenProvider_1.generateRefreshToken(vendor.id);
        this.tokenRepository.set({
            key: vendor.id,
            value: JSON.stringify({ token: refreshToken })
        });
        return { accessToken, refreshToken };
    }
}
exports.LoginUseCase = LoginUseCase;
