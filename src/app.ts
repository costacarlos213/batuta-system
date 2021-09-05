import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { router } from "./routes"
import path from "path"

const app = express()

dotenv.config()

app.use(cors())
app.use("/static", express.static(path.join(__dirname, "/assets")))
app.use(json())
app.use(router)

export { app }
