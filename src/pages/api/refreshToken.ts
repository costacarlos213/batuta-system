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
    } = await axios.get('http://54.85.180.1:3333/token', {
      headers,
      withCredentials: true
    })

    Object.keys(returnedHeaders).forEach(key =>
      res.setHeader(key, returnedHeaders[key])
    )

    console.log(`api refresh token return status: ${status}`)

    res.status(200).json(data)
  } catch (error) {
    res.setHeader(
      'set-cookie',
      'JID=; Max-Age=-1; Path=/; HttpOnly; SameSite=Lax'
    )

    res.redirect('/')
  }
}

export default RefreshToken
