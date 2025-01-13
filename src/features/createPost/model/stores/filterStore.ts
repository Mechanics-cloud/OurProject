import {
  ClassicFiltersType,
  FiltersState,
  prepareFilterStyles,
} from '@/features/createPost'
import { defaultClassicFiltersSettings } from '@/features/createPost/model/constants'
import { makeAutoObservable } from 'mobx'

export class FilterStore {
  filterStyle: string = ''
  settings: FiltersState = defaultClassicFiltersSettings

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addInstFilter(filter: FiltersState) {
    this.settings = filter
    this.generateFilter()
  }

  changeSetting(filter: ClassicFiltersType, value: number) {
    this.settings[filter] = value
    this.generateFilter()
  }

  generateFilter() {
    this.filterStyle = prepareFilterStyles(this.settings)
  }
}
