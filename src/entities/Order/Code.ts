export class Code {
  private constructor(private readonly _code: string) {}

  static create(code: string): Code {
    const isValid = this.validate(code)

    if (!isValid) throw new Error("Invalid Code")

    return new Code(code.trim())
  }

  get value(): string {
    return this._code
  }

  private static validate(code: string) {
    if (!code) {
      return false
    }

    if (code.length !== 4) {
      return false
    }

    const tester = /^[A-Z]\d+/s

    if (!tester.test(code)) {
      return false
    }

    return true
  }
}
