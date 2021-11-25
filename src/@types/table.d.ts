export type SimpleTableContent = Array<{
  cod: string
  date: string
  delivery: string
  description: string
  customerName: string
  total: number
  vendor: {
    name: string
    pixType: string
    pixKey: string
  }
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
  total: number
  color: "green" | "yellow"
  title: string
  fileKeys: string[]
  comments: string
  vendor: {
    name: string
    pixType: string
    pixKey: string
  }
}>
