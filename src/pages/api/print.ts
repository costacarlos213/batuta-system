import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const Print = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { headers, body } = req

  console.log('printing')

  try {
    const response = await axios.post(`${process.env.API_URL}/print`, body, {
      responseType: 'arraybuffer',
      headers
    })

    Object.keys(response.headers).forEach(key =>
      res.setHeader(key, response.headers[key])
    )

    res.status(200).send(response.data)
  } catch (error) {
    const response = error?.response

    return res.status(response.status).send(response.data)
  }
}

export default Print
