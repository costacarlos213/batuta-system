import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/services/api'

const DeleteOrders = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers, body } = req
  try {
    const response = await api.delete('http://3.84.17.159:3333/order', {
      headers,
      data: body
    })
    Object.keys(response.headers).forEach(key =>
      res.setHeader(key, response.headers[key])
    )

    return res.status(response.status).send(response.data)
  } catch (error) {
    const response = error?.response

    if (response.config.__isRetryRequest) {
      return res.redirect('/')
    }

    return res.status(response.status).json(response.data)
  }
}

export default DeleteOrders
