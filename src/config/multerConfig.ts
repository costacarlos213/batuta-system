import multer from "multer"
import path from "path"
import { v4 } from "uuid"

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
    },

    filename: (req, file, cb) => {
      const fileName = `${v4()}-${file.originalname}`

      return cb(null, fileName)
    }
  })
}

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes.local,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (
    req,
    file: Express.Multer.File,
    cb: (error: Error, isValid: boolean) => void
  ): void => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
      "image/jpg"
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type."), null)
    }
  }
}
