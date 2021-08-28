import { compare } from "bcrypt"
import { generateAccessToken } from "src/providers/token/AccessTokenProvider"
import { generateRefreshToken } from "src/providers/token/RefreshTokenProvider"
import { ITokenRepository } from "src/repositories/tokenRepository/ITokenRepository"
import { IVendorRepository } from "src/repositories/userRepository/IVendorRepository"
import { ILoginDTO, ILoginResponseDTO } from "./LoginUseCaseDTO"

export class LoginUseCase {
  constructor(
    private vendorRepository: IVendorRepository,
    private tokenRepository: ITokenRepository
  ) {}

  async execute(loginFields: ILoginDTO): Promise<ILoginResponseDTO> {
    const { email, password } = loginFields

    const vendor = await this.vendorRepository.get(email)

    if (!vendor) throw new Error("Wrong credentials.")

    const isPasswordValid = await compare(password, vendor.password)

    if (!isPasswordValid) throw new Error("Wrong credentials.")

    const accessToken = generateAccessToken(vendor.id)
    const refreshToken = generateRefreshToken(vendor.id)

    this.tokenRepository.set({
      key: vendor.id,
      value: JSON.stringify({ token: refreshToken })
    })

    return { accessToken, refreshToken }
  }
}
