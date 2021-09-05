class CPF {
  private readonly _cpf: string

  private constructor(cpf: string) {
    this._cpf = cpf
  }

  static create(cpf: string): CPF {
    const isValid = this.validate(cpf)

    if (!isValid) throw new Error("Invalid CPF.")

    return new CPF(cpf.trim())
  }

  get value(): string {
    return this._cpf
  }

  private static validate(value: string): boolean {
    if (typeof value !== "string") {
      return false
    }

    const cleanString = value.replace(/[\s.-]/g, "")

    if (!value) {
      return false
    }

    if (cleanString.length !== 11 || this.preventEqualNumbers(cleanString)) {
      return false
    }

    const digits = cleanString.slice(0, 9)
    const checker = cleanString.slice(9, 11)

    const firstChecker = this.calcFirstChecker(digits)

    if (checker.charAt(0) !== firstChecker) {
      return false
    }

    const secondChecker = this.calcSecondChecker(`${digits}${firstChecker}`)

    if (checker.charAt(1) !== secondChecker) {
      return false
    }

    return true
  }

  private static calcFirstChecker(digits: string): string {
    let sum = 0

    for (let i = 0; i < 9; i++) {
      sum += Number(digits.charAt(i)) * (10 - i)
    }

    let firstChecker = (sum * 10) % 11

    if (firstChecker === 10 || firstChecker === 11) {
      firstChecker = 0
    }

    return firstChecker.toString()
  }

  private static calcSecondChecker(digits: string): string {
    let sum = 0

    for (let i = 0; i < 10; ++i) {
      sum += Number(digits.charAt(i)) * (11 - i)
    }

    let secondChecker = (sum * 10) % 11

    if (secondChecker === 10 || secondChecker === 11) {
      secondChecker = 0
    }

    return secondChecker.toString()
  }

  private static preventEqualNumbers(digits: string): boolean {
    for (let i = 0; i < 10; i++) {
      if (digits === new Array(digits.length + 1).join(String(i))) {
        return true
      }
    }

    return false
  }
}

export { CPF }
