"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const CreateUserController_1 = require("src/controllers/CreateUserController");
const VendorRepository_1 = require("src/repositories/userRepository/implementation/VendorRepository");
const CreateUserUseCase_1 = require("src/useCases/createUser/CreateUserUseCase");
function createUserControllerFactory() {
    const userRepository = new VendorRepository_1.VendorRepository();
    const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepository);
    const createUserController = new CreateUserController_1.CreateUserController(createUserUseCase);
    return createUserController;
}
const createUserController = createUserControllerFactory();
exports.createUserController = createUserController;
