interface IMargin {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export interface IPdfProviderDTO {
  margin: IMargin
  scale?: number
  pdfContent: string
}

export interface IPdfProvider {
  execute(puppeterData: IPdfProviderDTO): Promise<Buffer>
}
