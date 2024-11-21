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
  'hue-rotate': 1,
  hueRotate: 0,
  saturate: 1,
  sepia: 0,
}

/* filters */
const f1977 = {
  brightness: 1,
  contrast: 1,
  grayscale: 0,
  'hue-rotate': -30,
  saturate: 1.4,
  sepia: 0.5,
}
const aden = {
  brightness: 1.15,
  contrast: 1,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1.4,
  sepia: 0.2,
}
const amaro = {
  brightness: 1.2,
  contrast: 1.1,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1.3,
  sepia: 0.35,
}
const ashby = {
  brightness: 1,
  contrast: 1.2,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1.8,
  sepia: 0.5,
}
const brooklyn = {
  brightness: 1.25,
  contrast: 1.25,
  grayscale: 0,
  'hue-rotate': 5,
  saturate: 1,
  sepia: 0.25,
}
const crema = {
  brightness: 1.15,
  contrast: 1.25,
  grayscale: 0,
  'hue-rotate': -2,
  saturate: 0.9,
  sepia: 0.5,
}
const inkwell = {
  brightness: 1.25,
  contrast: 0.85,
  grayscale: 1,
  'hue-rotate': 0,
  saturate: 1,
  sepia: 0,
}
const lofi = {
  brightness: 1,
  contrast: 1.5,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1.1,
  sepia: 0,
}
const ludwi = {
  brightness: 1.05,
  contrast: 1.05,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 2,
  sepia: 0.25,
}
const moon = {
  brightness: 1.4,
  contrast: 0.95,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 0,
  sepia: 0.35,
}
const perpetua = {
  brightness: 1.25,
  contrast: 1.1,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 1.1,
  sepia: 0,
}
const willow = {
  brightness: 1.2,
  contrast: 0.85,
  grayscale: 0,
  'hue-rotate': 0,
  saturate: 0.05,
  sepia: 0.2,
}
const xpro = {
  brightness: 1.75,
  contrast: 1.25,
  grayscale: 0,
  'hue-rotate': -5,
  saturate: 1.3,
  sepia: 0.45,
}

export const instFiltersData: InstFilter[] = [
  { name: 'Normal', style: defaultClassicFiltersSettings },
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
