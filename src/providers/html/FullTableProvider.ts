import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { FullTableContent } from "../../@types/table"

dayjs.extend(utc)
dayjs.extend(timezone)

export function generateFullTable(tableContent: FullTableContent): string {
  const articles: string[] = []

  tableContent.map(table => {
    function formatPhone(value) {
      value = value.replace(/\D/g, "") // Remove tudo o que não é dígito
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2") // Coloca parênteses em volta dos dois primeiros dígitos
      value = value.replace(/(\d)(\d{4})$/, "$1-$2") // Coloca hífen entre o quarto e o quinto dígitos
      return value
    }

    const phone = formatPhone(table.phone)

    let images = ""
    let pixType: string
    const numberOfImages = table.fileKeys.length

    table.fileKeys.forEach(fileName => {
      const dividedNumber = Math.round(440 / numberOfImages) - 2

      if (table.fileKeys.length > 1) {
        images += `<div class="flexChildren" style="width: ${dividedNumber}px;"><img class="rotatedImage" src="${fileName}" style="height: ${dividedNumber}px;" /></div>`
      } else {
        images += `<img src="${fileName}"/>`
      }
    })

    let total: string

    if (!table.total) {
      total = "0"
    } else {
      total = table.total.toString()
    }

    if (total === "" || total.length === 0) {
      total = "0"
    }

    switch (table.vendor.pixType) {
      case "cpf":
        pixType = "Cpf"
        break

      case "email":
        pixType = "Email"
        break

      case "phone":
        pixType = "Telefone"
        break

      case "randomKey":
        pixType = "Chave Aleatória"
        break

      default:
        pixType = ""
        break
    }

    return articles.push(`
      <article>
      <table>
        <thead>
          <th colspan="3" style="background-color: ${
            table.color !== "green" || !table.color ? "#A9A9A9" : "yellow"
          }; border-right: solid 1px black;">
            <h1>
              ${table.title.toUpperCase()}
            </h1>
          </th>
          <th colspan="3" style="background-color: red;">
          </th>
        </thead>
        <tbody>
          <tr>
            <td class="tbodyColumn">
              Cód
            </td>
            <td class="tbodyColumn">
              ${table.cod}
            </td>
            <td id="imgCell" rowspan="10">
              <div class="flex" style="justify-content: flex-start;">${
                images.length === 0 ? "<p>.</p>" : images
              }</div>
            </td>
            <td rowspan="11" class="vendorInfo">
            <p>
            Chave Pix - ${pixType}: ${table.vendor.pixKey}
            <br/>
            ${table.vendor.name}
          </p>
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Data
            </td>
            <td class="tbodyColumn">
              ${dayjs
                .utc(table.date)
                .tz("America/Sao_Paulo")
                .format("DD/MM/YYYY")}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Nome
            </td>
            <td class="tbodyColumn">
              ${table.customerName}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Vendedor
            </td>
            <td class="tbodyColumn">
              ${table.vendor.name}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Descrição
            </td>
            <td class="tbodyColumn" style="background-color: ${
              table.color !== "green" || !table.color ? "#A9A9A9" : "yellow"
            };">
              <p>
              ${table.description}
              </p>
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Celular
            </td>
            <td class="tbodyColumn">
            ${phone}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              A Pagar
            </td>
            <td class="tbodyColumn" style="background-color: ${
              table.color !== "green" || !table.color ? "#A9A9A9" : "yellow"
            };">
              R$ ${parseFloat(total).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Forma de pag
            </td>
            <td class="tbodyColumn">
              ${table.payment}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Entrega 
            </td>
            <td class="tbodyColumn">
              ${table.delivery}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Observações
            </td>
            <td class="tbodyColumn" style="background-color: red; text-align: left;">
              <p>
                ${table.comments}
              </p>
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn" style="padding-bottom: 0.5rem; padding-top: 0.5rem;">
              Endereço
            </td>
            <td class="tbodyColumn" colspan="2" style="background-color: ${
              table.color !== "green" || !table.color ? "#A9A9A9" : "yellow"
            };">
              <p>
                ${table.address}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </article>  
    `)
  })

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      th {
        height: 60px;
        font-size: large;
      }
  
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box !important;
        overflow: hidden;
        font-family: Arial, Helvetica, sans-serif;
      }
      
      main {
        display: flex;
        flex-wrap: wrap;
        width: 100vw;
      }
  
      table {
        border: solid 1px black;
        border-collapse: collapse;
        width: 470px;
        height: 560px;
        max-height: 560px !important;
        display: table;
      }
  
      article {
        width: 470px;
        height: 560px !important;
        max-height: 560px !important;
        max-width: 470px;
        margin-right: 10px;
        margin-bottom: 37px;
      }
  
      .vendorInfo {
        background-color: red; 
        max-width: 40px;
        min-width: 40px;
        text-align: center;
        writing-mode: vertical-lr; 
        padding-bottom: 50px;
        padding-left: 10px;
        z-index: 9999;
        border-right: solid 1px black;
        border-left: solid 1px black;
        border-bottom: solid 1px black;
      }

      .vendorInfo p {
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 18px;
        font-weight: bold;
        color: white; 
        text-align: center;
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
        display: block;
        height: 100%;
        width: 440px;
        position: relative;
        z-index: 9999;
      }

      .tbodyColumn p {
        padding-top: 5px;
        padding-bottom: 5px;
        overflow-wrap: normal;
        font-family: Arial, Helvetica, sans-serif;
        overflow: hidden;
        max-height: 70px;
      }
  
      .tbodyColumn {
        display: table-cell;
        height: 1fr;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border: solid 1px black;
        text-align: center;
        width: 120px;
        font-size: 14.5px;
        font-family: Arial, Helvetica, sans-serif;
      }
  
      td + td {
        font-weight: bold;
      }
  
      #imgCell {
        display: table-cell;
        width: 160px !important;
        max-width: 160px !important;
        max-height: 420px !important;
        height: 420px;
        padding: 1px;
      }
  
      img {
        max-height: 360px;
        max-width: 160px;
        object-fit: contain;
      }

      .rotatedImage {
        transform: rotate(90deg);
        max-height: 160px;
        max-width: 100px;
      }
  
      .flexChildren {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 160px;
        max-height: 100px;
      }

      .flex {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        height: 100% !important;
      }
    </style>
  </head>
  <body>
    <main>
        ${articles.map(article => {
          return article
        })}
    </main>
  </body>
  </html>`

  return html
}