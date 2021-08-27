import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
prisma.$connect()
console.log("Connected to database")

export { prisma }
