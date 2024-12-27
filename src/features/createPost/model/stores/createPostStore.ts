import { createFileForUpload, responseErrorHandler } from '@/common'
import { UploadPost, addPostApi } from '@/features/createPost'
import {
  MaxDescriptionLength,
  PostCreationState,
  PostCreationStateType,
  mapNext,
  mapPrev,
} from '@/features/createPost/model/constants'
import { ImageStore } from '@/features/createPost/model/stores/imageStore'
import { profileStore } from '@/features/profile'
import { makeAutoObservable, runInAction } from 'mobx'

import { ImageCollection } from './imageCollection'

class CreatePostStore {
  currentStage: PostCreationStateType = PostCreationState.adding
  images: ImageCollection = new ImageCollection()
  isNewDialog = true
  location: string[] = []
  postDescription: string = ''

  prevStage = () => {
    this.currentStage = mapPrev.get(this.currentStage) ?? this.currentStage
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addImage(file: File) {
    const url = URL.createObjectURL(file)

    this.images.addItem(new ImageStore(url))
  }

  addLocation(city: string, country: string) {
    this.location = [city, country]
  }

  addPostDescription(description: string) {
    if (description.length > MaxDescriptionLength) {
      description = description.slice(0, MaxDescriptionLength)
    }
    this.postDescription = description.toString()
  }

  clearLocation() {
    this.location = []
  }

  continueDialog() {
    this.isNewDialog = false
    if (this.currentStage === PostCreationState.adding) {
      this.currentStage = PostCreationState.cropping
    }
  }

  async nextStage() {
    if (this.currentStage === PostCreationState.cropping) {
      await this.images.applyCropAll()
    }
    runInAction(() => {
      this.currentStage = mapNext.get(this.currentStage) ?? this.currentStage
    })
  }

  resetData() {
    this.currentStage = PostCreationState.adding
    this.images.clear()
    this.location = []
    this.postDescription = ''
  }

  startNewDialog() {
    this.isNewDialog = true
  }

  async uploadPost() {
    try {
      await this.images.applyFilterAll()
      const formData = new FormData()

      await this.images.applyActionToAll((image) => {
        const file = createFileForUpload(image.preparedImgData)

        if (file) {
          formData.append('file', file, file.name || 'Post image')
        }
      })
      const res = await addPostApi.uploadImages(formData)
      const post: UploadPost = {
        childrenMetadata: res.data.images.map((imageData) => ({
          uploadId: imageData.uploadId,
        })),
        description: this.postDescription,
      }

      await addPostApi.uploadPostDescription(post)
      await profileStore.cleanUpPhotosData()
      this.resetData()
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  get isDraft() {
    return !this.images.isEmpty
  }
}

export const createPostStore = new CreatePostStore()
