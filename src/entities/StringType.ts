export class StringType {
  private constructor(private readonly _name: string) {}

  static create(name: string): StringType {
    const isValid = this.validate(name)

    if (!isValid) throw new Error("Invalid String")

    const cleanName = name.replace(
      /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/g,
      ""
    )

    return new StringType(cleanName)
  }

  get value(): string {
    return this._name
  }

  private static validate(name: string): boolean {
    if (!name) {
      return false
    }

    if (typeof name !== "string") {
      return false
    }

    const trimmedName = name.trim()

    if (trimmedName.length < 2 || trimmedName.length > 255) {
      return false
    }

    return true
  }
}
