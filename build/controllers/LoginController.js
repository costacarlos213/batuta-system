"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    async handle(req, res) {
        const loginFields = req.body;
        try {
            const login = await this.loginUseCase.execute(loginFields);
            return res.status(200).json(login);
        }
        catch (error) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
}
exports.LoginController = LoginController;
