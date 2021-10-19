class Phone {
  constructor(private readonly _phoneNumber: string) {}

  static create(phone: string): Phone {
    if (!phone || phone.length === 0 || phone === "undefined") {
      return new Phone("")
    }

    const isValid = this.validate(phone)

    if (!isValid) throw new Error("Invalid Phone")

    return new Phone(phone.trim().replace(/[\s().-]+/g, ""))
  }

  get value(): string {
    return this._phoneNumber
  }

  private static validate(phone: string): boolean {
    const cleanPhone = phone.replace(/[\s().-]+/g, "")

    const tester =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/

    if (!tester.test(cleanPhone)) {
      return false
    }

    return true
  }
}

export { Phone }
