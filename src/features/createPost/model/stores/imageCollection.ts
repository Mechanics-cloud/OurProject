import { ImageStore } from '@/features/createPost'
import { action, makeObservable } from 'mobx'

import { Collection } from './collection'

export class ImageCollection extends Collection<ImageStore> {
  constructor() {
    super()
    makeObservable(this, {
      applyCropAll: action,
      applyFilterAll: action,
    })
    this.setCurrentIndex = this.setCurrentIndex.bind(this)
  }

  async applyCropAll() {
    await this.applyActionToAll(async (image) => {
      await image.applyCrop()
    })
  }

  async applyFilterAll() {
    await this.applyActionToAll((image) => image.applyFilter())
  }
}
