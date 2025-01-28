import { Environments } from '@/common'

import { generatePath } from './generatePath'
import { getQueryParams } from './getQueryParams'

export const PathService = {
  generatePath,

  generateQueryPath: (url: string, query?: string) =>
    query ? `${url}?${query}` : url,

  generateServerPath: (url: string) => `${Environments.API_URL}${url}`,

  getQueryParams,
}
