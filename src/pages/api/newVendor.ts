import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const NewVendor = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers, body } = req

  console.log(body)

  axios
    .post(`${process.env.API_URL}/user`, body, {
      headers: {
        ...headers,
        Authorization: headers.authorization || ''
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

      res.status(response.status).json(response.data)
    })
}

export default NewVendor
