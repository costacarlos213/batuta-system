export class Address {
  private constructor(private readonly _address: string) {}

  get value(): string {
    return this._address
  }

  static create(address: string): Address {
    if (!address || address.length === 0 || address === "undefined") {
      return new Address("")
    }

    const isValid = this.validate(address)

    if (!isValid) throw new Error("Invalid Address")

    return new Address(address.trim())
  }

  private static validate(address: string): boolean {
    const trimmedAddress = address.trim()

    if (trimmedAddress.length < 2 || trimmedAddress.length > 255) {
      return false
    }

    const tester = /[" X"a-zA-Z\d,-]+/gs

    if (!tester.test(trimmedAddress)) return false

    return true
  }
}
