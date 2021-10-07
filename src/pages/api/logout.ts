import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie } from 'nookies'

const Login = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { headers } = req

  try {
    const response = await axios.delete(`${process.env.API_URL}/auth/logout`, {
      headers
    })

    Object.entries(response.headers).forEach(keyArr =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    )

    destroyCookie({ res }, 'JID', {
      path: '/',
      httpOnly: true
    })

    destroyCookie({ res }, 'dashboard.access-token', {
      path: '/'
    })

    res.status(200).redirect('/')
  } catch (error) {
    console.log('ERROR ON LOGOUT')

    res.status(error?.response?.status).json({})
  }
}

export default Login
