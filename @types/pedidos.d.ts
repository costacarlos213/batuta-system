interface FormValues {
  cod: string
  file_: FileList
  delivery: string
  customerName: string
  phone: string
  total: number
  payment: string
  address: string
  description: string
  vendorId: string
  initialDate: string
  finalDate: string
  comments: string
  color: 'green' | 'yellow'
  title: string
}

export interface UseFormType {
  pedidos: FormValues[]
}

export interface ISearchForm {
  cod: string
  address: string
  customerName: string
  delivery: string
  description: string
  payment: string
  phone: string
  total: number
  vendorId: string
  initialDate: string
  finalDate: string
}

export interface IOrder {
  address: string
  cod: string
  color: 'green' | 'yellow'
  title: string
  comments: string
  customerName: string
  date: string
  delivery: string
  description: string
  fileNames: string[]
  id: string
  payment: string
  phone: string
  total: string
  vendorId: string
  vendor: {
    pixType: string
    pixKey: string
    name: string
    id: string
  }
}
