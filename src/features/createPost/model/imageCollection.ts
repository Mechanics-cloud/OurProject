import { PhotoStore } from '@/features/createPost'
import { action, makeAutoObservable, observable } from 'mobx'

export class ImageCollection {
  images: PhotoStore[]

  constructor(images: PhotoStore[] = []) {
    this.images = images
    // makeAutoObservable(
    //   this,
    //   {
    //     addImage: action,
    //     applyActionToAll: action,
    //     applyCropAll: action,
    //     applyFilterAll: action,
    //     deleteImage: action,
    //     images: observable,
    //   },
    //   { autoBind: true }
    // )
    makeAutoObservable(this)
  }

  addImage(image: PhotoStore) {
    this.images.push(image)
  }

  applyActionToAll(action: (image: PhotoStore) => void) {
    this.images.forEach((image) => action(image))
  }

  applyCropAll() {
    this.applyActionToAll((image) => image.addCroppedImgUrl())
    this.applyActionToAll((image) => (image.cropDataSave = image.crop))
  }

  applyFilterAll() {
    this.applyActionToAll((image) => image.addFilteredImgUrl())
  }

  deleteImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id)
  }

  findImageById(id: string): PhotoStore | undefined {
    return this.images.find((image) => image.id === id)
  }

  get photoCount() {
    return this.images.length
  }

  get toArray() {
    return this.images
  }
}
