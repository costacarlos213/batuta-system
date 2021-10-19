export type Pix = 'randomKey' | 'phone' | 'cpf' | 'email'

interface IFormValues {
  name: string
  email: string
  pixType: Pix
  pixKey: string
}

export interface IVendorFields {
  vendors: IFormValues[]
}
