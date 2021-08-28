"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const redis_1 = require("src/database/redis");
class TokenRepository {
    async set(keyValue) {
        const { key, value } = keyValue;
        redis_1.redis.set(key, value);
    }
    async get(key) {
        return await redis_1.redis.get(key);
    }
}
exports.TokenRepository = TokenRepository;
