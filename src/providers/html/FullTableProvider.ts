import { FullTableContent } from "src/@types/table"

export function generateFullTable(tableContent: FullTableContent): string {
  const articles: string[] = []

  tableContent.map(table => {
    return articles.push(`
      <article>
      <table>
        <thead>
          <th colspan="3">
            <h1>
              Kit Grande
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
              <img src="http://localhost:3333/static/ENEM.jpg"/>
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
            ${table.phone}
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
        background-color: green;
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
  
      img {
        object-fit: cover;
        width: 100%;
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
