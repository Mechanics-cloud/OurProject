import { Environments } from '@/common/enviroments'
import axios from 'axios'

export const instance = axios.create({
  baseURL: Environments.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
