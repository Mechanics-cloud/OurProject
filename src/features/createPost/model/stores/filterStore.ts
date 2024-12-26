import {
  ClassicFiltersType,
  FiltersState,
  applyFilters,
  prepareFilterStyles,
} from '@/features/createPost'
import { defaultClassicFiltersSettings } from '@/features/createPost/model/constants'
import { makeAutoObservable, runInAction } from 'mobx'

export class FilterStore {
  filterStyle: string = ''
  settings: FiltersState = defaultClassicFiltersSettings

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addInstFilter(filter: FiltersState) {
    this.settings = filter
    this.setFilter()
  }

  changeSetting(filter: ClassicFiltersType, value: number) {
    this.settings[filter] = value
    this.setFilter()
  }

  setFilter() {
    this.filterStyle = prepareFilterStyles(this.settings)
  }
}
