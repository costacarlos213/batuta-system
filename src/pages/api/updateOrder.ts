import axios from 'axios'
import Busboy from 'busboy'
import FormData from 'form-data'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false
  }
}

const UpdateOrder = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers } = req

  try {
    const busboy = new Busboy({
      headers
    })

    const formData = new FormData()

    busboy.on('file', (fieldname, file, filename) => {
      const buf: any[] = []

      file
        .on('data', data => {
          buf.push(data)
        })
        .on('end', async () => {
          const data = Buffer.concat(buf)

          formData.append(fieldname, data, { filename: filename })
        })
    })

    busboy.on('field', (fieldname, fieldValue) => {
      formData.append(fieldname, fieldValue)
    })

    busboy.on('finish', () => {
      axios
        .put(`${process.env.API_URL}/order`, formData, {
          headers: {
            Authorization: headers.authorization || '',
            origin: headers.origin,
            'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`
          }
        })
        .then(response => {
          Object.keys(response.headers).forEach(key =>
            res.setHeader(key, response.headers[key])
          )

          res.status(response.status).send(response.data)
        })
        .catch(err => {
          const response = err?.response

          res.status(response.status).send(response.data)
        })
    })
    req.pipe(busboy)
  } catch (error) {
    const response = error?.response

    console.log(response.status)
    res.status(response.status).send(response.data)
  }
}

export default UpdateOrder
