export interface ISetDTO {
  key: string
  value: string
}

export interface ITokenRepository {
  set(value: ISetDTO): Promise<void>
  get(key: string): Promise<string>
  del(key: string): Promise<void>
}
