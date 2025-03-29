import { responseErrorHandler } from '@/common'

type Result<T> = {
  data: T | null
}

export async function tryCatch<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promise

    return { data }
  } catch (error) {
    responseErrorHandler(error)

    return { data: null }
  }
}
