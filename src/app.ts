import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { router } from "./routes"
import path from "path"
import cookieParser from "cookie-parser"

const app = express()

dotenv.config()

app.use(cookieParser())
app.use(
  cors({
    credentials: true
  })
)

app.use("/files", express.static(path.join(__dirname, "/public/uploads")))
app.use(express.urlencoded({ extended: true }))
app.use(json())
app.use(router)

export { app }
