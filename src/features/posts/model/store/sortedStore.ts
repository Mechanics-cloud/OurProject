import { Nullable, SortDirection } from '@/common'
import { makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export interface ISortedStore<T> {
  isLoading: boolean
  items: Nullable<T[]>
  pageNumber: number
  pageSize: number
  pagesCount: number
  sortBy: string
  sortDirection: SortDirection
  totalCount: number
}

export abstract class SortedStore<T> implements ISortedStore<T> {
  isLoading: boolean
  items: Nullable<T[]>
  pageNumber: number
  pageSize: number
  pagesCount: number
  sortBy: string
  sortDirection: SortDirection
  totalCount: number

  protected constructor(sortDirection: SortDirection) {
    this.items = null
    this.isLoading = true
    this.pageSize = 10
    this.totalCount = 0
    this.pagesCount = 2
    this.pageNumber = 1
    this.sortDirection = sortDirection
    this.sortBy = 'createdAt'

    makeObservable(this, {
      isLoading: observable,
      items: observable,
      pageNumber: observable,
      pageSize: observable,
      pagesCount: observable,
      sortBy: observable,
      sortDirection: observable,
      totalCount: observable,
    })
  }

  setLoading(loading: boolean) {
    this.isLoading = loading
  }
}
