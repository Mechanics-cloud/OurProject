import { PhotoResult, getCroppedImg } from '@/common'
import { applyFilters } from '@/features/createPost'
import { CropStore } from '@/features/createPost/model/stores/cropStore'
import { FilterStore } from '@/features/createPost/model/stores/filterStore'
import { makeAutoObservable, runInAction } from 'mobx'

export class ImageStore {
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
      const cropImageData = await getCroppedImg(this.url, this.crop.croppedArea)

      runInAction(() => {
        this.preparedImgData = {
          photoFile: cropImageData.photoFile,
          photoUrl: cropImageData.photoUrl,
        }
        this.imgUrlToShow = cropImageData.photoUrl as string
      })
    } catch (error) {
      throw new Error('Something went wrong')
    }
  }

  async applyFilter() {
    try {
      if (this.preparedImgData.photoFile && this.filter.filterStyle) {
        const filterImageData = await applyFilters(
          this.preparedImgData.photoFile,
          this.filter.filterStyle
        )

        runInAction(() => {
          this.preparedImgData = {
            photoFile: filterImageData.photoFile,
            photoUrl: filterImageData.photoUrl,
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
    const image = this

    img.onload = function () {
      runInAction(() => {
        if (image) {
          image.originAspect = img.width / img.height

          return
        }
      })
    }
  }
}
