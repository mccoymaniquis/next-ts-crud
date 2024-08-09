import axios from 'axios'
import Cookies from 'js-cookie'
import queryString from 'query-string'

import { StatusCode } from '@/types'

const sessionOptions = {
  cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME,
  cookieOptions: {
    maxAge: undefined,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : false,
  },
}

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
    'client-secret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
  },

  paramsSerializer: (params) =>
    queryString.stringify(params, {
      skipEmptyString: true,
      skipNull: true,
    }),
})

request.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    const token = Cookies.get(sessionOptions.cookieName)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      if (
        !error.request.responseURL.endsWith('sign-in') &&
        (error.response.status === StatusCode.Unauthorized ||
          error.response.status === StatusCode.Forbidden) &&
        typeof window !== 'undefined'
      ) {
        document.cookie = `${sessionOptions.cookieName}=`
        window.location.href = '/sign-in'
      }

      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject(error.response.data)
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(
        new Error('The request was made but no response was received')
      )
    }
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(new Error('Something went wrong, Please try again.'))
  }
)

export default request
