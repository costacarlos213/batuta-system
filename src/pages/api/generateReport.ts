import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/services/api'

const Print = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers, body } = req

  try {
    const response = await api.post(
      'http://54.85.180.1:3333/print',
      {
        printArray: body
      },
      {
        responseType: 'arraybuffer',
        headers
      }
    )

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

export default Print
