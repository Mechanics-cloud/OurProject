import { PhotoStore } from '@/features/createPost'
import { makeAutoObservable, runInAction } from 'mobx'

export class ImageCollection {
  currentIndex: number = 0
  images: PhotoStore[] //вынести в коллекцию

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
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addImage(image: PhotoStore) {
    this.images.push(image)
  }

  applyActionToAll(action: (image: PhotoStore) => void) {
    this.images.forEach((image) => action(image))
  }

  async applyCropAll() {
    const promises = this.images.map(async (image) => {
      await image.addCroppedImgUrl()
    })

    await Promise.all(promises)

    this.applyActionToAll((image) => (image.cropDataSave = image.crop))
  }

  applyFilterAll() {
    this.applyActionToAll((image) => image.addFilteredImgUrl())
  }

  clearCollection() {
    this.currentIndex = 0
    this.images = []
  }

  deleteImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id)
  }

  findImageById(id: string): PhotoStore | undefined {
    return this.images.find((image) => image.id === id)
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index
  }

  get photoCount() {
    return this.images.length
  }

  get toArray() {
    return this.images
  }
}
