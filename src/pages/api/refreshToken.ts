import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const RefreshToken = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { headers } = req

  try {
    console.log('api refresh token')

    const {
      data,
      headers: returnedHeaders,
      status
    } = await axios.get(`${process.env.API_URL}/token`, {
      headers,
      withCredentials: true
    })

    Object.keys(returnedHeaders).forEach(key =>
      res.setHeader(key, returnedHeaders[key])
    )

    console.log(`api refresh token return status: ${status}`)

    res.status(200).json(data)
  } catch (error) {
    console.log(error)

    res.redirect('/')
  }
}

export default RefreshToken
