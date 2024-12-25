import { PhotoStore } from '@/features/createPost'
import { makeAutoObservable } from 'mobx'

export class ImageCollection {
  private readonly images: PhotoStore[]

  constructor(images: PhotoStore[] = []) {
    makeAutoObservable(this, undefined, { autoBind: true })
    this.images = images
  }

  addImage(image: PhotoStore) {
    this.images.push(image)
  }

  applyActionToAll(action: (image: PhotoStore) => void) {
    this.images.forEach((image) => action(image))
  }

  applyCropAll() {
    this.applyActionToAll((image) => image.addCroppedImgUrl)
    this.applyActionToAll((image) => (image.cropDataSave = image.crop))
  }

  applyFilterAll() {
    this.applyActionToAll((image) => image.addFilteredImgUrl)
  }

  deleteImage(id: string) {
    return this.images.filter((image) => image.id !== id)
  }

  findImageById(id: string): PhotoStore | undefined {
    return this.images.find((image) => image.id === id)
  }

  getImages() {
    return this.images
  }

  getPhotoCount() {
    return this.images.length
  }
}
