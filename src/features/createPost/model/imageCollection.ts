import { PhotoStore } from '@/features/createPost'
import { makeAutoObservable } from 'mobx'

class Collection<T extends { id: number | string }> {
  private currentIndex: number = 0
  private items: T[] = []

  constructor(items: T[] = []) {
    this.items = items
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addItem(item: T) {
    const id = Math.random().toString(16).slice(2)

    this.items.push({ ...item, id: item.id ?? id })
  }

  applyActionToAll(action: (image: T) => void) {
    this.items.forEach((item) => action(item))
  }

  clear() {
    this.currentIndex = 0
    this.items = []
  }

  getItemById(id: number | string): T | undefined {
    return this.items.find((item) => item.id === id)
  }

  getItemByIndex(index: number) {
    return this.items[index]
  }

  removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index
  }

  get isEmpty() {
    return this.items.length === 0
  }

  get itemCount() {
    return this.items.length
  }

  get itemsArr() {
    return this.items
  }
}

export class ImageCollection extends Collection<PhotoStore> {
  constructor(images: PhotoStore[] = []) {
    super(images)
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async applyCropAll() {
    const promises = this.itemsArr.map(async (image) => {
      await image.addCroppedImgUrl()
    })

    await Promise.all(promises)

    this.applyActionToAll((image) => (image.cropDataSave = image.crop))
  }

  applyFilterAll() {
    this.applyActionToAll((image) => image.addFilteredImgUrl())
  }
}

// export class ImageCollection {
//   currentIndex: number = 0
//   images: PhotoStore[] //вынести в коллекцию
//
//   constructor(images: PhotoStore[] = []) {
//     this.images = images
//     // makeAutoObservable(
//     //   this,
//     //   {
//     //     addImage: action,
//     //     applyActionToAll: action,
//     //     applyCropAll: action,
//     //     applyFilterAll: action,
//     //     deleteImage: action,
//     //     images: observable,
//     //   },
//     //   { autoBind: true }
//     // )
//     makeAutoObservable(this, undefined, { autoBind: true })
//   }
//
//   addImage(image: PhotoStore) {
//     this.images.push(image)
//   }
//
//   applyActionToAll(action: (image: PhotoStore) => void) {
//     this.images.forEach((image) => action(image))
//   }
//
//   async applyCropAll() {
//     const promises = this.images.map(async (image) => {
//       await image.addCroppedImgUrl()
//     })
//
//     await Promise.all(promises)
//
//     this.applyActionToAll((image) => (image.cropDataSave = image.crop))
//   }
//
//   applyFilterAll() {
//     this.applyActionToAll((image) => image.addFilteredImgUrl())
//   }
//
//   clearCollection() {
//     this.currentIndex = 0
//     this.images = []
//   }
//
//   deleteImage(id: string) {
//     this.images = this.images.filter((image) => image.id !== id)
//   }
//
//   findImageById(id: string): PhotoStore | undefined {
//     return this.images.find((image) => image.id === id)
//   }
//
//   setCurrentIndex(index: number) {
//     this.currentIndex = index
//   }
//
//   get photoCount() {
//     return this.images.length
//   }
//
//   get toArray() {
//     return this.images
//   }
// }
