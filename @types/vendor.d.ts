export type Pix = 'randomKey' | 'phone' | 'cpf' | 'email'

export interface IFormValues {
  id?: string
  name?: string
  email?: string
  pixType?: Pix
  pixKey?: string
}

export interface IVendorFields {
  vendors: IFormValues[]
}
