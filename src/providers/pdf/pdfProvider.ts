import puppeteer from "puppeteer"
import { readFileSync, unlinkSync } from "fs"
import path from "path"
import { v4 as uuid } from "uuid"
import { exec } from "shelljs"
import { IPdfProvider, IPdfProviderDTO } from "./IPdfProviderDTO"

export class PdfProvider implements IPdfProvider {
  async execute({
    pdfContent,
    margin,
    scale
  }: IPdfProviderDTO): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox"
      ]
    })

    const page = await browser.newPage()

    const universalId = uuid()

    await page.setContent(pdfContent)

    const publicFolder = path.join(__dirname, "generated")

    const pdfPath = path.join(publicFolder, `${universalId}.pdf`)

    await page.pdf({
      format: "a4",
      path: pdfPath,
      printBackground: true,
      margin,
      scale
    })

    await page.close()
    await browser.close()

    const compressedPdfPath = path.join(
      publicFolder,
      `${universalId}-compressed.pdf`
    )

    const shrinkPdfPath = path.join(publicFolder, "shrinkpdf.sh")

    await exec(`sh ${shrinkPdfPath} ${pdfPath} ${compressedPdfPath} 150`)

    const pdfBuffer = await readFileSync(compressedPdfPath)
    await unlinkSync(pdfPath)
    await unlinkSync(compressedPdfPath)

    return pdfBuffer
  }
}
