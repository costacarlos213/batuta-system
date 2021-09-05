import { SimpleTableContent } from "src/@types/table"

export function generateSimpleTable(tableContent: SimpleTableContent): string {
  const tableRows: string[] = []
  let sum = 0

  tableContent.map(row => {
    sum = row.total + sum

    return tableRows.push(`
        <tr>
          <td class="tbodyColumn">
            ${row.code}
          </td>
          <td class="tbodyColumn">
            ${row.date}
          </td>
          <td class="tbodyColumn">
            ${row.name}
          </td>
          <td class="tbodyColumn">
            ${row.vendor}
          </td>
          <td class="tbodyColumn">
            ${row.description}
          </td>
          <td class="tbodyColumn">
            ${row.total.toFixed(2)}
          </td>
          <td class="tbodyColumn">
            ${row.delivery}
          </td>
        </tr>
      `)
  })

  const table = `
      <!DOCTYPE html>
      <html>
      <body>
        <style>
          table {
            border: solid 2px black;
            border-collapse: collapse;
            width: 100vw;
          }
      
          .theadRow {
            display: table-cell;
            padding-left: 0.25rem;
            padding-right: 0.25rem;
            border: solid 2px black;
            background-color: yellow;
          }
      
          .tbodyColumn {
            display: table-cell;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            width: min-content;
            border: solid 2px black;
            text-align: center;
          }
      
        </style>
        <div>
          <table>
            <thead>
              <tr>
                <th class="theadRow">
                  Cód.
                </th>
                <th class="theadRow">
                  Data
                </th>
                <th class="theadRow">
                  Nome
                </th>
                <th class="theadRow">
                  Vendedor
                </th>
                <th class="theadRow">
                  Descrição
                </th>
                <th class="theadRow">
                  Total
                </th>
                <th class="theadRow">
                  Entrega
                </th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.map(row => {
                return row
              })}
              <tr>
                <td class="tbodyColumn">
                </td>
                <td class="tbodyColumn">
                </td>
                <td class="tbodyColumn">
                </td>
                <td class="tbodyColumn">
                </td>
                <td class="tbodyColumn" style="background-color: red; color: white">
                  Total
                </td>
                <td class="tbodyColumn" style="background-color: red; color: white">
                  ${sum.toFixed(2)}
                </td>
                <td class="tbodyColumn">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
      </html>
      `

  return table
}
