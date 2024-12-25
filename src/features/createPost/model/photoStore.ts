import { Area, Point } from 'react-easy-crop'

import { Nullable, PhotoResult, getCroppedImg } from '@/common'
import {
  ClassicFiltersType,
  FiltersState,
  applyFilters,
  prepareFilterStyles,
} from '@/features/createPost'
import { defaultClassicFiltersSettings } from '@/features/createPost/model/constants'
import { makeAutoObservable, runInAction } from 'mobx'

export class PhotoStore {
  aspect: number = 1
  crop: Point = { x: 0, y: 0 }
  cropDataSave: Nullable<Point> = null
  croppedArea: Area = { height: 0, width: 0, x: 0, y: 0 }
  filter: string = ''
  filterSettings: FiltersState = defaultClassicFiltersSettings
  id: string = ''
  imgUrlToShow: string = ''
  originAspect: number = 1
  preparedImgData: PhotoResult = {
    photoFile: null,
    photoUrl: null,
  }
  url: string = ''
  zoom?: number = 1

  constructor(url: string) {
    makeAutoObservable(this, undefined, { autoBind: true })
    this.id = Math.random().toString(16).slice(2)
    this.url = url
    this.initOriginAspect(url)
  }

  addCrop(crop: Point) {
    this.crop = crop
  }

  addCroppedArea(croppedAreaPixels: Area) {
    this.croppedArea = croppedAreaPixels
  }

  async addCroppedImgUrl() {
    try {
      const cropPhotoData = await getCroppedImg(this.url, this.croppedArea)

      runInAction(() => {
        this.preparedImgData = {
          photoFile: cropPhotoData.photoFile,
          photoUrl: cropPhotoData.photoUrl,
        }
        this.imgUrlToShow = cropPhotoData.photoUrl as string
      })
    } catch (error) {
      throw new Error('Something went wrong')
    }
  }

  async addFilteredImgUrl() {
    try {
      if (this.preparedImgData.photoFile && this.filter) {
        const filterPhotoData = await applyFilters(
          this.preparedImgData.photoFile,
          this.filter
        )

        runInAction(() => {
          this.preparedImgData = {
            photoFile: filterPhotoData.photoFile,
            photoUrl: filterPhotoData.photoUrl,
          }
        })
      }
    } catch (error) {
      throw new Error('Something went wrong')
    }
  }

  addInstFilter(filter: FiltersState) {
    this.filterSettings = filter
    this.applyFilter()
  }

  addZoom(zoom: number) {
    this.zoom = zoom
  }

  applyFilter() {
    this.filter = prepareFilterStyles(this.filterSettings)
  }

  changeAspect(aspect: number) {
    this.aspect = aspect
  }

  changeFilterSetting(filter: ClassicFiltersType, value: number) {
    this.filterSettings[filter] = value
    this.applyFilter()
  }

  getAspect() {
    return this.aspect
  }

  getOriginAspect() {
    return this.originAspect
  }

  getZoom() {
    return this.zoom
  }

  initOriginAspect(url: string) {
    const img = new Image()

    img.src = url
    const photo = this

    img.onload = function () {
      runInAction(() => {
        if (photo) {
          photo.originAspect = img.width / img.height

          return
        }
      })
    }
  }
}
