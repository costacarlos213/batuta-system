import Redis from "ioredis"

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  db: 1
})

redis.on("ready", () => {
  console.log("redis is ready")
})

export { redis }
