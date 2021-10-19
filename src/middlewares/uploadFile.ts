import multer from "multer"
import { multerConfig } from "../config/multerConfig"
import util from "util"

const uploadFile = multer(multerConfig).any()
export const uploadFileMiddleware = util.promisify(uploadFile)
