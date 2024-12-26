import { PhotoResult, getCroppedImg } from '@/common'
import { CropStore, FilterStore, applyFilters } from '@/features/createPost'
import { makeAutoObservable, runInAction } from 'mobx'

export class PhotoStore {
  crop: CropStore = new CropStore()
  filter: FilterStore = new FilterStore()
  id: string = ''
  imgUrlToShow: string = ''
  originAspect: number = 1
  preparedImgData: PhotoResult = {
    photoFile: null,
    photoUrl: null,
  }
  url: string = ''

  constructor(url: string) {
    makeAutoObservable(this, undefined, { autoBind: true })
    this.id = Math.random().toString(16).slice(2)
    this.url = url
    this.initOriginAspect(url)
  }

  async applyCrop() {
    try {
      const cropPhotoData = await getCroppedImg(this.url, this.crop.croppedArea)

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

  async applyFilter() {
    try {
      if (this.preparedImgData.photoFile && this.filter) {
        const filterPhotoData = await applyFilters(
          this.preparedImgData.photoFile,
          this.filter.filterStyle
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

  getOriginAspect() {
    return this.originAspect
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
