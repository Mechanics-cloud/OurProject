import { Point } from 'react-easy-crop'

import { findObjectInArray } from '@/common/utils/findObjectInArray'
import {
  PhotoEditorState,
  PhotoEditorStateType,
  PostPhoto,
} from '@/features/createPost/model/constants'
import { makeAutoObservable, runInAction } from 'mobx'

class AddPostStore {
  currentStage: PhotoEditorStateType = PhotoEditorState.adding
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
    makeAutoObservable(this)
    this.changeStage = this.changeStage.bind(this)
    this.nextStage = this.nextStage.bind(this)
    this.prevStage = this.prevStage.bind(this)
    this.addPhoto = this.addPhoto.bind(this)
    this.addZoom = this.addZoom.bind(this)
    this.addCrop = this.addCrop.bind(this)
    this.changeAspect = this.changeAspect.bind(this)
    this.getAspect = this.getAspect.bind(this)
    this.getZoom = this.getZoom.bind(this)
    this.getOriginAspect = this.getOriginAspect.bind(this)
  }

  addCrop(id: string, crop: Point) {
    const photo = findObjectInArray(this.photos, id)

    if (photo) {
      photo.crop = crop
    }
  }

  addPhoto(file: File) {
    const id = Math.random().toString(16).slice(2)
    const url = URL.createObjectURL(file)

    this.photos = [
      ...this.photos,
      {
        aspect: 1,
        crop: { x: 0, y: 0 },
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
  }

  getAspect(id: string) {
    return findObjectInArray(this.photos, id)?.aspect ?? 1
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
}

export const addPostStore = new AddPostStore()
