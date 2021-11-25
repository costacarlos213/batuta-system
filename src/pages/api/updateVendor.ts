import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const UpdateVendor = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { headers, body } = req

  try {
    const response = await axios.put(`${process.env.API_URL}/user`, body, {
      headers: {
        ...headers
      }
    })

    Object.keys(response.headers).forEach(key =>
      res.setHeader(key, response.headers[key])
    )

    res.status(response.status).send(response.data)
  } catch (error) {
    const response = error?.response

    res.status(response.status).send(response.data)
  }
}

export default UpdateVendor
