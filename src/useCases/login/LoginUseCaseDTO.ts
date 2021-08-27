export interface ILoginDTO {
  email: string
  password: string
}

export interface ILoginResponseDTO {
  accessToken: string
  refreshToken: string
}
