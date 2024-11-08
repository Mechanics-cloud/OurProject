import {
  PhotoEditorState,
  PhotoEditorStateType,
} from '@/features/createPost/model/constants'
import { makeAutoObservable } from 'mobx'

class AddPostStore {
  currentStage: PhotoEditorStateType = PhotoEditorState.adding

  prevStage = () => {
    switch (this.currentStage) {
      case 'CROPPING':
        this.changeStage(PhotoEditorState.adding)

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
  }

  changeStage(newStage: PhotoEditorStateType) {
    this.currentStage = newStage
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
}

export const addPostStore = new AddPostStore()
