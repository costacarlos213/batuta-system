import { ObjectId } from "bson"

export interface IOrder {
  id?: ObjectId
  cod: string
  vendor: string
  date?: string
  customerName: string
  description: string
  total: number
  delivery: string
  comments?: string
  payment: string
  address: string
  phone: string
  cpf?: string
}
