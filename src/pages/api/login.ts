import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

const Login = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { headers, body } = req

  try {
    const response = await axios.post(
      `${process.env.API_URL}/auth/login`,
      body,
      {
        headers
      }
    )

    Object.entries(response.headers).forEach(keyArr =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    )

    setCookie({ res }, 'JID', response.data.refreshToken, {
      maxAge: 60 * 60 * 24 * 15,
      path: '/',
      httpOnly: true
    })

    res.status(200).json({ accessToken: response.data.accessToken })
  } catch (error) {
    console.log('ERROR ON LOGIN')

    console.log(error)

    res.status(error?.response?.status).json({})
  }
}

export default Login
