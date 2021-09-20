export type SimpleTableContent = Array<{
  cod: string
  date: string
  delivery: string
  description: string
  customerName: string
  vendor: string
  total: number
}>

export type FullTableContent = Array<{
  address: string
  payment: string
  phone: string
  cod: string
  date: string
  delivery: string
  description: string
  customerName: string
  vendor: string
  total: number
  color: "green" | "yellow"
  title: string
  fileKeys: string[]
}>
