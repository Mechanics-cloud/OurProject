import { Point } from 'react-easy-crop'

import {
  PhotoEditorState,
  PhotoEditorStateType,
  PostPhoto,
} from '@/features/createPost/model/constants'
import { makeAutoObservable } from 'mobx'

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
  }

  addCrop(id: string, crop: Point) {
    const photo = this.photos.find((p) => p.id === id)

    if (photo) {
      photo.crop = crop
    }
  }

  async addPhoto(file: File) {
    const id = Math.random().toString(16).slice(2)
    const dimension: number = 1

    //const objectUrl = URL.createObjectURL(file)
    //const img = new Image()
    // img.onload = () => {
    //   dimension = img.height / img.width
    //   URL.revokeObjectURL(objectUrl)
    // }

    this.photos = [
      ...this.photos,
      {
        aspect: dimension,
        crop: { x: 0, y: 0 },
        id,
        originAspect: dimension,
        url: URL.createObjectURL(file),
        zoom: 1,
      },
    ]
  }

  addZoom(id: string, zoom: number) {
    this.photos = this.photos.map((photo) =>
      photo.id === id ? { ...photo, zoom } : photo
    )
  }

  changeAspect(id: string, aspect: number) {
    const photo = this.photos.find((ph) => ph.id === id)

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
    const photo = this.photos.find((ph) => ph.id === id)

    if (photo) {
      return photo.aspect
    }

    return
  }

  getZoom(id: string) {
    const photo = this.photos.find((ph) => ph.id === id)

    if (photo) {
      return photo.zoom ?? 1
    }

    return 1
  }

  // getOriginAspect(id: string) {
  //   const photo = this.photos.find((ph) => ph.id === id)
  //
  //   return photo?.originAspect
  // }

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
}

export const addPostStore = new AddPostStore()
