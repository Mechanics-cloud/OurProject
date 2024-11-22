import { Area, Point } from 'react-easy-crop'

import {
  createFileForUpload,
  findObjectInArray,
  getCroppedImg,
  responseErrorHandler,
} from '@/common'
import { FiltersState, addPostApi } from '@/features/createPost'
import { UploadPost } from '@/features/createPost/api/addPost.types'
import { applyFilters } from '@/features/createPost/model/applyFilters'
import {
  MaxDescriptionLength,
  PhotoEditorState,
  PhotoEditorStateType,
  defaultClassicFiltersSettings,
  mapNext,
  mapPrev,
} from '@/features/createPost/model/constants'
import { prepareFilterStyles } from '@/features/createPost/model/prepareFilterStyles'
import {
  ClassicFiltersType,
  PostPhoto,
} from '@/features/createPost/model/types'
import { makeAutoObservable, runInAction } from 'mobx'

class AddPostStore {
  currentSliderIndex: number = 0
  currentStage: PhotoEditorStateType = PhotoEditorState.adding
  isNewDialog = true
  location: string[] = []
  photos: PostPhoto[] = []
  postDescription: string = ''

  prevStage = () => {
    this.currentStage = mapPrev.get(this.currentStage) ?? this.currentStage
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addCrop(id: string, crop: Point) {
    const photo = findObjectInArray(this.photos, id)

    if (photo) {
      photo.crop = crop
    }
  }

  addCroppedArea(id: string, croppedAreaPixels: Area) {
    const photo = findObjectInArray(this.photos, id)

    if (photo) {
      photo.croppedArea = croppedAreaPixels
    }
  }

  async addCroppedImgUrl() {
    for (const photo of this.photos) {
      try {
        const cropPhotoData = await getCroppedImg(photo.url, photo.croppedArea)

        runInAction(() => {
          photo.preparedImgData = {
            photoFile: cropPhotoData.photoFile,
            photoUrl: cropPhotoData.photoUrl,
          }
          photo.imgUrlToShow = cropPhotoData.photoUrl as string
        })
      } catch (error) {
        throw new Error('Something went wrong')
      }
    }
  }

  addCurrentSliderIndex(index: number) {
    runInAction(() => {
      this.currentSliderIndex = index
    })
  }

  async addFilteredImgUrl() {
    for (const photo of this.photos) {
      try {
        if (photo.preparedImgData.photoFile && photo.filter) {
          const filterPhotoData = await applyFilters(
            photo.preparedImgData.photoFile,
            photo.filter
          )

          runInAction(() => {
            photo.preparedImgData = {
              photoFile: filterPhotoData.photoFile,
              photoUrl: filterPhotoData.photoUrl,
            }
          })
        }
      } catch (error) {
        throw new Error('Something went wrong')
      }
    }
  }

  addInstFilter(index: number, filter: FiltersState) {
    this.photos[index].filterSettings = filter
    this.applyFilter(index)
  }

  addLocation(city: string, country: string) {
    this.location = [city, country]
  }

  addPhoto(file: File) {
    const id = Math.random().toString(16).slice(2)
    const url = URL.createObjectURL(file)

    this.photos = [
      ...this.photos,
      {
        aspect: 1,
        crop: { x: 0, y: 0 },
        cropDataSave: null,
        croppedArea: { height: 0, width: 0, x: 0, y: 0 },
        filter: '',
        filterSettings: defaultClassicFiltersSettings,
        id,
        imgUrlToShow: '',
        originAspect: 1,
        preparedImgData: {
          photoFile: null,
          photoUrl: null,
        },
        url,
        zoom: 1,
      },
    ]
    this.initOriginAspect(id, url)
  }

  addPostDescription(description: string) {
    if (description.length > MaxDescriptionLength) {
      description = description.slice(0, MaxDescriptionLength)
    }
    this.postDescription = description.toString()
  }

  addZoom(id: string, zoom: number) {
    this.photos = this.photos.map((photo) =>
      photo.id === id ? { ...photo, zoom } : photo
    )
  }

  applyFilter(index: number) {
    this.photos[index].filter = prepareFilterStyles(
      this.photos[index].filterSettings
    )
  }

  changeAspect(id: string, aspect: number) {
    const photo = findObjectInArray(this.photos, id)

    if (photo) {
      photo.aspect = aspect
    }
  }

  changeFilterSetting(
    index: number,
    filter: ClassicFiltersType,
    value: number
  ) {
    this.photos[index].filterSettings[filter] = value
    this.applyFilter(index)
  }

  clearLocation() {
    this.location = []
  }

  continueDialog() {
    this.isNewDialog = false
    if (this.currentStage === PhotoEditorState.adding) {
      this.currentStage = PhotoEditorState.cropping
    }
  }

  deletePhoto(id: string) {
    this.photos = this.photos.filter((photo) => photo.id !== id)
  }

  getAspect(id: string) {
    return findObjectInArray(this.photos, id)?.aspect ?? 1
  }

  getCurrentPhotosCount() {
    return this.photos.length
  }

  getOriginAspect(id: string) {
    return findObjectInArray(this.photos, id)?.originAspect ?? 1
  }

  getZoom(id: string) {
    return findObjectInArray(this.photos, id)?.zoom ?? 1
  }

  initOriginAspect(id: string, url: string) {
    const img = new Image()

    img.src = url
    const photo = findObjectInArray(this.photos, id)

    img.onload = function () {
      runInAction(() => {
        if (photo) {
          photo.originAspect = img.width / img.height

          return
        }
      })
    }
  }

  async nextStage() {
    if (this.currentStage === PhotoEditorState.cropping) {
      await this.addCroppedImgUrl()
      this.photos.forEach((photo) => {
        photo.cropDataSave = photo.crop
      })
    }
    runInAction(() => {
      this.currentStage = mapNext.get(this.currentStage) ?? this.currentStage
    })
  }

  resetData() {
    this.currentStage = PhotoEditorState.adding
    this.photos = []
    this.currentSliderIndex = 0
    this.location = []
    this.postDescription = ''
  }

  startNewDialog() {
    this.isNewDialog = true
  }

  async uploadPost() {
    try {
      await this.addFilteredImgUrl()
      const formData = new FormData()

      for (const photo of this.photos) {
        const file = createFileForUpload(photo.preparedImgData)

        if (file) {
          formData.append('file', file, file.name || 'Post photo')
        }
      }
      const res = await addPostApi.uploadPhotos(formData)
      const post: UploadPost = {
        childrenMetadata: [{ uploadId: res.data.images[0].uploadId }],
        description: this.postDescription,
      }

      await addPostApi.uploadPostDescription(post)
      this.resetData()
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  get isDraft() {
    return this.photos.length > 0
  }
}

export const addPostStore = new AddPostStore()
