import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/services/api'

const GetOrders = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers } = req

  try {
    const response = await api.get(`${process.env.API_URL}/order`, {
      headers
    })

    Object.keys(response.headers).forEach(key =>
      res.setHeader(key, response.headers[key])
    )

    res.status(200).send(response.data)
  } catch (error) {
    console.log('error!')
    console.log(error)

    const response = error?.response

    console.log(response)

    res.status(response?.status).send(response?.data)
  }
}

export default GetOrders
