import { ObjectId } from "bson"

export interface IFilesInfo {
  fileUrls: string[]
  fileKeys: string[]
  fileSizes: number[]
}

export type AllowedColors = "green" | "yellow"

export interface IOrder {
  id?: ObjectId
  cod?: string
  vendorId: string
  date?: string
  customerName?: string
  description?: string
  total?: number
  delivery?: string
  comments?: string
  payment?: string
  address?: string
  phone?: string
  files?: IFilesInfo
  title?: string
  color?: AllowedColors
}
