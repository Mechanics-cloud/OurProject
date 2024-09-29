import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INCTAGRAM_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
