import { FullTableContent } from "src/@types/table"

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

    table.fileKeys.forEach(fileName => {
      images += `<div class="flexChildren"><img src="${fileName}"/></div>`
    })

    return articles.push(`
      <article>
      <table>
        <thead>
          <th colspan="3" style="background-color: ${table.color};">
            <h1>
              ${table.title.toUpperCase()}
            </h1>
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
            <td id="imgCell" rowspan="8">
              <div class="flex">${images}</div>
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
              ${table.vendor}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Descrição
            </td>
            <td class="tbodyColumn">
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
            <td class="tbodyColumn">
              R$ ${table.total.toFixed(2)}
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
              Forma de entrega
            </td>
            <td class="tbodyColumn">
              ${table.delivery}
            </td>
          </tr>
          <tr>
            <td class="tbodyColumn">
              Endereço
            </td>
            <td class="tbodyColumn" colspan="2" style="padding-bottom: 10px;">
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
        box-sizing: border-box;
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
        width: 100%;
      }
  
      article {
        width: 430px;
        margin-right: 30px;
        margin-bottom: 65px;
      }
  
      p {
        white-space: pre-line;
      }
  
      .tbodyColumn {
        display: table-cell;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border: solid 1px black;
        text-align: center;
        white-space: nowrap;
        width: fit-content;
        font-size: small;
      }
  
      td + td {
        font-weight: bold;
      }
  
      #imgCell {
        display: table-cell;
        border: solid 1px black;
        width: 320px;
        height: 420px;
        padding: 1px;
      }
  
      img {
        object-fit: contain;
        width: 100%;
        max-height: 320px;
      }
  
      .flex {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
      }
  
      .flexChildren {
        flex: 1
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
