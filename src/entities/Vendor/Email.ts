export class Email {
  private constructor(private readonly _email: string) {}

  static create(email: string): Email {
    const isValid = this.validate(email)

    if (!isValid) throw new Error("Invalid Email")

    return new Email(email)
  }

  get value(): string {
    return this._email
  }

  private static validate(email: string): boolean {
    const tester =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email) {
      return false
    }

    if (email.length > 255) {
      return false
    }

    if (!tester.test(email)) {
      return false
    }

    const [account, address] = email.split("@")

    if (account.length > 63) {
      return false
    }

    const domainParts = address.split(".")

    const domainIsValid = domainParts.every(part => {
      if (part.length > 63) {
        return false
      } else {
        return true
      }
    })

    if (!domainIsValid) {
      return false
    }

    return true
  }
}
