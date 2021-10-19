import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/services/api'

const GetNames = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers } = req

  try {
    const response = await api.get(`${process.env.API_URL}/user`, {
      headers
    })

    Object.keys(response.headers).forEach(key =>
      res.setHeader(key, response.headers[key])
    )

    res.status(200).send(response.data)
  } catch (error) {
    const response = error?.response

    res.status(response?.status).send(response?.data)
  }
}

export default GetNames
