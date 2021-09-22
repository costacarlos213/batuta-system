import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/services/api'

const GetOrders = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers } = req
  try {
    const response = await api.get('http://3.84.17.159:3333/order', {
      headers
    })

    Object.keys(response.headers).forEach(key =>
      res.setHeader(key, response.headers[key])
    )

    res.status(200).send(response.data)
  } catch (error) {
    const response = error?.response

    if (response.config.__isRetryRequest) {
      return res.redirect('/')
    }

    res.status(response.status).send(response.data)
  }
}

export default GetOrders
