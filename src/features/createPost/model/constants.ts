import { ClassicSetting, InstFilter } from './types'

export const PhotoEditorState = {
  adding: 'ADDING',
  cropping: 'CROPPING',
  filtering: 'FILTERING',
  publication: 'PUBLICATION',
} as const

export type PhotoEditorStateType =
  (typeof PhotoEditorState)[keyof typeof PhotoEditorState]

export const mapNext = new Map<PhotoEditorStateType, PhotoEditorStateType>([
  [PhotoEditorState.adding, PhotoEditorState.cropping],
  [PhotoEditorState.cropping, PhotoEditorState.filtering],
  [PhotoEditorState.filtering, PhotoEditorState.publication],
])

export const mapPrev = new Map()
for (const [key, value] of mapNext) {
  mapPrev.set(value, key)
}

export const MaxPhotoCount = 10
export const MaxDescriptionLength = 500

export const classicSettingsData: ClassicSetting[] = [
  { centered: true, field: 'contrast', name: 'Contrast' },
  { centered: true, field: 'brightness', name: 'Brightness' },
  { centered: true, field: 'saturate', name: 'Saturation' },
  { field: 'sepia', name: 'Sepia' },
  { field: 'grayscale', name: 'Grayscale' },
] as const

export const defaultClassicFiltersSettings = {
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  saturate: 1,
  sepia: 0,
}

/* filters */
const f1977 = 'sepia(0.5) hue-rotate(-30deg) saturate(1.4)'
const aden = 'sepia(0.2) brightness(1.15) saturate(1.4)'

const amaro = 'sepia(0.35) contrast(1.1) brightness(1.2) saturate(1.3)'
const ashby = 'sepia(0.5) contrast(1.2) saturate(1.8)'
const brooklyn = 'sepia(0.25) contrast(1.25) brightness(1.25) hue-rotate(5deg)'
const crema =
  'sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9) hue-rotate(-2deg)'
const inkwell = 'brightness(1.25) contrast(0.85) grayscale(1)'
const lofi = 'saturate(1.1) contrast(1.5)'
const ludwi = 'sepia(0.25) contrast(1.05) brightness(1.05) saturate(2)'
const moon = 'brightness(1.4) contrast(0.95) saturate(0) sepia(0.35)'
const perpetua = 'contrast(1.1) brightness(1.25) saturate(1.1)'
const willow = 'brightness(1.2) contrast(0.85) saturate(0.05) sepia(0.2)'
const xpro =
  'sepia(0.45) contrast(1.25) brightness(1.75) saturate(1.3) hue-rotate(-5deg)'

export const instFiltersData: InstFilter[] = [
  { name: 'Normal', style: '' },
  { name: '1977', style: f1977 },
  { name: 'Aden', style: aden },
  { name: 'Amaro', style: amaro },
  { name: 'Ashby', style: ashby },
  { name: 'Brooklyn', style: brooklyn },
  { name: 'Inkwell', style: inkwell },
  { name: 'Crema', style: crema },
  { name: 'Lofi', style: lofi },
  { name: 'Ludwi', style: ludwi },
  { name: 'Moon', style: moon },
  { name: 'Perpetua', style: perpetua },
  { name: 'Willow', style: willow },
  { name: 'Xpro', style: xpro },
] as const
