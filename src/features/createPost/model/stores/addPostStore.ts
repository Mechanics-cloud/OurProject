import { createFileForUpload, responseErrorHandler } from '@/common'
import { PhotoStore, UploadPost, addPostApi } from '@/features/createPost'
import {
  MaxDescriptionLength,
  PhotoEditorState,
  PhotoEditorStateType,
  mapNext,
  mapPrev,
} from '@/features/createPost/model/constants'
import { Collection } from '@/features/createPost/model/stores/imageCollection'
import { profileStore } from '@/features/profile'
import { makeAutoObservable, runInAction } from 'mobx'

class AddPostStore {
  currentStage: PhotoEditorStateType = PhotoEditorState.adding
  isNewDialog = true
  location: string[] = []
  photos: Collection = new Collection()
  postDescription: string = ''

  prevStage = () => {
    this.currentStage = mapPrev.get(this.currentStage) ?? this.currentStage
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  addLocation(city: string, country: string) {
    this.location = [city, country]
  }

  addPhoto(file: File) {
    const url = URL.createObjectURL(file)

    this.photos.addItem(new PhotoStore(url))
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
    if (this.currentStage === PhotoEditorState.adding) {
      this.currentStage = PhotoEditorState.cropping
    }
  }

  async nextStage() {
    if (this.currentStage === PhotoEditorState.cropping) {
      await this.photos.applyCropAll()
    }
    runInAction(() => {
      this.currentStage = mapNext.get(this.currentStage) ?? this.currentStage
    })
  }

  resetData() {
    this.currentStage = PhotoEditorState.adding
    this.photos.clear()
    this.location = []
    this.postDescription = ''
  }

  startNewDialog() {
    this.isNewDialog = true
  }

  async uploadPost() {
    try {
      await this.photos.applyFilterAll()
      const formData = new FormData()

      await this.photos.applyActionToAll((image) => {
        const file = createFileForUpload(image.preparedImgData)

        if (file) {
          formData.append('file', file, file.name || 'Post photo')
        }
      })
      const res = await addPostApi.uploadPhotos(formData)
      const post: UploadPost = {
        childrenMetadata: res.data.images.map((photoData) => ({
          uploadId: photoData.uploadId,
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
    return !this.photos.isEmpty
  }
}

export const addPostStore = new AddPostStore()
