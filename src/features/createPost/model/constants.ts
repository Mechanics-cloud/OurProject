import {
  FilterType,
  PhotoEditorStateType,
} from '@/features/createPost/model/types'

export const PhotoEditorState = {
  adding: 'ADDING',
  cropping: 'CROPPING',
  filtering: 'FILTERING',
  publication: 'PUBLICATION',
} as const

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

export const instFiltersData: FilterType[] = [
  { name: 'Normal', style: '' },
  { name: '1977', style: 'filter-1977' },
  { name: 'Aden', style: 'filter-aden' },
  { name: 'Amaro', style: 'filter-amaro' },
  { name: 'Ashby', style: 'filter-ashby' },
  { name: 'Brooklyn', style: 'filter-brooklyn' },
  { name: 'Crema', style: 'filter-crema' },
  { name: 'Lofi', style: 'filter-lofi' },
  { name: 'Ludwi', style: 'filter-ludwi' },
  { name: 'Moon', style: 'filter-moon' },
  { name: 'Perpetua', style: 'filter-perpetua' },
  { name: 'Willow', style: 'filter-willow' },
  { name: 'Xpro', style: 'filter-xpro' },
] as const
