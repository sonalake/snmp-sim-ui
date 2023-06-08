import axios from 'axios'

export const baseApi = axios.create({
  headers: { 'content-type': 'application/json', accept: 'application/json' },
})
