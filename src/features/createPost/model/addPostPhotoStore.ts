import { Area, Point } from 'react-easy-crop'

import { findObjectInArray } from '@/common/utils/findObjectInArray'
import { PhotoEditorState } from '@/features/createPost/model/constants'
import {
  PhotoEditorStateType,
  PostPhoto,
} from '@/features/createPost/model/types'
import { makeAutoObservable, runInAction } from 'mobx'

class AddPostPhotoStore {
  currentSliderIndex: number = 0
  currentStage: PhotoEditorStateType = PhotoEditorState.adding
  isNewDialog = true
  photos: PostPhoto[] = []

  prevStage = () => {
    switch (this.currentStage) {
      case 'CROPPING':
        this.changeStage(PhotoEditorState.adding)
        this.clearData()

        return
      case 'FILTERING':
        this.changeStage(PhotoEditorState.cropping)

        return
      case 'PUBLICATION':
        this.changeStage(PhotoEditorState.filtering)

        return
      default:
        return
    }
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

  addCurrentSliderIndex(index: number) {
    runInAction(() => {
      this.currentSliderIndex = index
    })
  }

  addIsNewDialog() {
    this.isNewDialog = true
  }

  addIsNotNewDialog() {
    this.isNewDialog = false
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
        id,
        originAspect: 1,
        url,
        zoom: 1,
      },
    ]
    this.setOriginAspect(id, url)
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

  changeStage(newStage: PhotoEditorStateType) {
    this.currentStage = newStage
  }

  clearData() {
    this.currentStage = PhotoEditorState.adding
    this.photos = []
    this.currentSliderIndex = 0
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

  nextStage() {
    switch (this.currentStage) {
      case 'ADDING':
        this.changeStage(PhotoEditorState.cropping)

        return
      case 'CROPPING':
        this.changeStage(PhotoEditorState.filtering)

        return
      case 'FILTERING':
        this.changeStage(PhotoEditorState.publication)

        return
      default:
        return
    }
  }

  setOriginAspect(id: string, url: string) {
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

  get isDraft() {
    return this.photos.length > 0
  }
}

export const addPostPhotoStore = new AddPostPhotoStore()
