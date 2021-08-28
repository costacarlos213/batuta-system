"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async handle(req, res) {
        const userData = req.body;
        if (!userData) {
            return res.status(400).json({
                message: "Missing data"
            });
        }
        try {
            await this.createUserUseCase.execute(userData);
            return res.status(201).json({
                message: "User has been created."
            });
        }
        catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    }
}
exports.CreateUserController = CreateUserController;
