import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const DeleteVendors = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers, body } = req
  try {
    const response = await axios.delete(`${process.env.API_URL}/user`, {
      headers,
      data: body
    })
    Object.keys(response.headers).forEach(key =>
      res.setHeader(key, response.headers[key])
    )

    return res.status(response.status).send(response.data)
  } catch (error) {
    const response = error?.response

    console.log(response.data)

    return res.status(response.status).json(response.data)
  }
}

export default DeleteVendors
