import { WheelEvent, forwardRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { ImageOutline } from '@/assets/icons/outlineIcons'
import { Nullable } from '@/common'
import { PhotoEditorProps } from '@/features/profile/settings/avatarDialog/model'

export const PhotoEditor = forwardRef<Nullable<AvatarEditor>, PhotoEditorProps>(
  ({ photo }, ref) => {
    const [scale, setScale] = useState(1)

    const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
      const newScale = scale + e.deltaY * -0.001

      setScale(Math.min(Math.max(newScale, 1), 2))
    }

    return (
      <>
        {!photo ? (
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
        ) : (
          <div onWheel={handleScroll}>
            <AvatarEditor
              border={10}
              borderRadius={170}
              color={[23, 23, 23, 0.6]}
              height={320}
              image={photo}
              ref={ref}
              scale={scale}
              width={320}
            />
          </div>
        )}
      </>
    )
  }
)
