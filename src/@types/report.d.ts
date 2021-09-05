interface ITimeInterval {
  initialDate: string
  finalDate: string
}

export interface IFilters {
  code?: string
  customerName?: string
  phone?: string
  address?: string
  vendor?: string
  description?: string
  payment?: string
  delivery?: string
  timeInterval?: ITimeInterval
}
