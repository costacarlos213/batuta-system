import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const DeleteOrders = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  console.log('deleting...')

  const { headers, body } = req
  try {
    const response = await axios.delete('http://54.85.180.1:3333/order', {
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

export default DeleteOrders
