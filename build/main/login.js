"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const LoginController_1 = require("src/controllers/LoginController");
const TokenRepository_1 = require("src/repositories/tokenRepository/implementation/TokenRepository");
const VendorRepository_1 = require("src/repositories/userRepository/implementation/VendorRepository");
const LoginUseCase_1 = require("src/useCases/login/LoginUseCase");
function loginControllerFactory() {
    const vendorRepository = new VendorRepository_1.VendorRepository();
    const tokenRepository = new TokenRepository_1.TokenRepository();
    const loginUseCase = new LoginUseCase_1.LoginUseCase(vendorRepository, tokenRepository);
    const loginController = new LoginController_1.LoginController(loginUseCase);
    return loginController;
}
const loginController = loginControllerFactory();
exports.loginController = loginController;
