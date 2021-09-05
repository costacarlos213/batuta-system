import multer from "multer"
import { multerConfig } from "src/config/multerConfig"
import util from "util"

const uploadFile = multer(multerConfig).any()
export const uploadFileMiddleware = util.promisify(uploadFile)
