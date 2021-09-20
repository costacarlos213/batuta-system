interface FormValues {
  cod: string
  file_: FileList
  delivery: string
  customerName: string
  phone: string
  vendor: string
  total: number
  payment: string
  address: string
  description: string
  vendor: string
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
  vendor: string
  initialDate: string
  finalDate: string
}
