import { redis } from "src/database/redis"
import { ISetDTO, ITokenRepository } from "../ITokenRepository"

export class TokenRepository implements ITokenRepository {
  async set(keyValue: ISetDTO): Promise<void> {
    const { key, value } = keyValue

    // redis.set(key, value)
  }

  async get(key: string): Promise<string> {
    return "ok"
  }

  async del(key: string): Promise<void> {
    // redis.del(key)
  }
}
