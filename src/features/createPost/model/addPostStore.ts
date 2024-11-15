import { Area, Point } from 'react-easy-crop'
import { toast } from 'react-toastify'

import getCroppedImg from '@/common/utils/crop'
import { findObjectInArray } from '@/common/utils/findObjectInArray'
import {
  MaxDescriptionLength,
  PhotoEditorState,
  mapNext,
  mapPrev,
} from '@/features/createPost/model/constants'
import {
  PhotoEditorStateType,
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
          photo.croppedImgUrl = {
            photoFile: cropPhotoData.photoFile,
            photoUrl: cropPhotoData.photoUrl,
          }
        })
      } catch (error) {
        toast('Something went wrong')
      }
    }
  }

  addCurrentSliderIndex(index: number) {
    runInAction(() => {
      this.currentSliderIndex = index
    })
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
        croppedArea: { height: 0, width: 0, x: 0, y: 0 },
        croppedImgUrl: {
          photoFile: null,
          photoUrl: url,
        },
        id,
        originAspect: 1,
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

  changeAspect(id: string, aspect: number) {
    const photo = findObjectInArray(this.photos, id)

    if (photo) {
      photo.aspect = aspect
    }
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
    }
    runInAction(() => {
      this.currentStage = mapNext.get(this.currentStage) ?? this.currentStage
    })
  }

  resetData() {
    this.currentStage = PhotoEditorState.adding
    this.photos = []
    this.currentSliderIndex = 0
  }

  startNewDialog() {
    this.isNewDialog = true
  }

  get isDraft() {
    return this.photos.length > 0
  }
}

export const addPostStore = new AddPostStore()
