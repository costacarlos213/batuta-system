type FormValues = {
  code: string
  file_: FileList
  delivery: string
  customerName: string
  phone: string
  vendor: string
  value: string
  payment: string
  address: string
  description: string
}

export type UseFormType = {
  pedidos: FormValues[]
}
