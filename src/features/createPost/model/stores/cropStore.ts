import { Area, Point } from 'react-easy-crop'

import { Nullable } from '@/common'
import { makeAutoObservable } from 'mobx'

export class CropStore {
  aspect: number = 1
  cropDataSave: Nullable<Point> = null
  cropPointStart: Point = { x: 0, y: 0 }
  croppedArea: Area = { height: 0, width: 0, x: 0, y: 0 }
  zoom: number = 1

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  changeAspect(aspect: number) {
    this.aspect = aspect
  }

  changeCropPointStart(crop: Point) {
    this.cropPointStart = crop
  }

  changeCroppedArea(croppedAreaPixels: Area) {
    this.croppedArea = croppedAreaPixels
  }

  changeZoom(zoom: number) {
    this.zoom = zoom
  }

  getAspect() {
    return this.aspect
  }

  getZoom() {
    return this.zoom
  }
}
