import { AllowedColors } from "../../entities/Order/IOrder"

interface IFile {
  fieldname: string
  key?: string
  location?: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface ICreateOrderDTO {
  vendorId: string | string[]
  comments: string | string[]
  total: string | string[]
  customerName: string | string[]
  description: string | string[]
  phone: string | string[]
  payment: string | string[]
  address: string | string[]
  delivery: string | string[]
  title: string | string[]
  color: AllowedColors | AllowedColors[]
  files: IFile[]
}
