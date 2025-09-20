import Axios from 'axios'

const baseURL = `${process.env.NEXT_API_BASE_URL ?? 'localhost:8080'}/api/${process.env.NEXT_API_VERSION ?? 'v1'}`

export const httpClient = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
