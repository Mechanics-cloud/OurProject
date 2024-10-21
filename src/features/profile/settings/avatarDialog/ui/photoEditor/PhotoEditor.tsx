import { WheelEvent, forwardRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { ImageOutline } from '@/assets/icons/outlineIcons'
import { Nullable } from '@/common'
import { PhotoEditorProps } from '@/features/profile/settings/avatarDialog/model'

export const PhotoEditor = forwardRef<Nullable<AvatarEditor>, PhotoEditorProps>(
  ({ photo }, ref) => {
    const [zoom, setZoom] = useState(1)

    const onPhotoZoom = (e: WheelEvent<HTMLDivElement>) => {
      const newZoom = zoom + e.deltaY * -0.001 // current zoom
      const minZoomState = Math.max(newZoom, 1) // no less than 1
      const maxZoomState = Math.min(minZoomState, 2) //no more than 2

      setZoom(maxZoomState)
    }

    return (
      <>
        {photo ? (
          <div onWheel={onPhotoZoom}>
            <AvatarEditor
              border={10}
              borderRadius={170}
              color={[23, 23, 23, 0.6]}
              height={320}
              image={photo}
              ref={ref}
              scale={zoom}
              width={320}
            />
          </div>
        ) : (
          <div
            className={
              'w-[220px] aspect-square flex justify-center items-center bg-dark-500'
            }
          >
            <ImageOutline
              height={48}
              width={48}
            />
          </div>
        )}
      </>
    )
  }
)
