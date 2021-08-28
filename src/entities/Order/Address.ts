export class Address {
  private constructor(private readonly _address: string) {}

  get value(): string {
    return this._address
  }

  static create(address: string): Address {
    const isValid = this.validate(address)

    if (!isValid) throw new Error("Invalid Address")

    return new Address(address.trim())
  }

  private static validate(address: string): boolean {
    if (!address) {
      return false
    }

    if (typeof address !== "string") return false

    const trimmedAddress = address.trim()

    if (trimmedAddress.length < 2 || trimmedAddress.length > 255) {
      return false
    }

    const tester = /[" X"a-zA-Z\d,-]+/gs

    if (!tester.test(trimmedAddress)) return false

    return true
  }
}