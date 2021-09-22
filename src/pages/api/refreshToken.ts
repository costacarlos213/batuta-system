import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/services/api'

const RefreshToken = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { headers } = req
  try {
    const { data, headers: returnedHeaders } = await api.get(
      'http://3.84.17.159:3333/token',
      {
        headers
      }
    )
    Object.keys(returnedHeaders).forEach(key =>
      res.setHeader(key, returnedHeaders[key])
    )
    res.status(200).json(data)
  } catch (error) {
    res.send(error)
  }
}

export default RefreshToken
