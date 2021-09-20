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

export interface IUpdateOrderDTO {
  vendor?: string
  total?: string
  customerName?: string
  description?: string
  phone?: string
  payment?: string
  address?: string
  delivery?: string
  cod?: string
  id: string
  insertedFiles?: IFile[]
  deletedFiles?: string[]
}
