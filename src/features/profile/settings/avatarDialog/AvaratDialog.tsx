import * as React from 'react'
import { ReactNode, WheelEvent, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { ImageOutline } from '@/assets/icons/outlineIcons'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common'

type Props = {
  modalHandler: (item: string) => void
  triggerButton: ReactNode
}
export const AvaratDialog = ({ modalHandler, triggerButton }: Props) => {
  const [photo, setPhoto] = useState<null | string>(null)
  const [photoType, setPhotoType] = useState<null | string>(null)
  const [error, setError] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const [scale, setScale] = useState(1)
  const editorRef = useRef<AvatarEditor | null>(null)

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    const newScale = scale + e.deltaY * -0.001

    setScale(Math.min(Math.max(newScale, 1), 2))
  }

  const handleSave = () => {
    if (editorRef.current) {
      console.log(editorRef.current)
      const canvas = editorRef.current.getImageScaledToCanvas()
      const context = canvas.getContext('2d')

      if (context) {
        const size = Math.min(canvas.width, canvas.height)
        const outputCanvas = document.createElement('canvas')

        outputCanvas.width = size
        outputCanvas.height = size
        const outputContext = outputCanvas.getContext('2d')

        if (outputContext) {
          outputContext.beginPath()
          outputContext.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true)
          outputContext.clip()

          outputContext.drawImage(
            canvas,
            (canvas.width - size) / 2,
            (canvas.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          )

          const inputFileType = photoType?.split('/')[1]

          let imageFormat = 'image/png'

          if (inputFileType === 'jpg' || inputFileType === 'jpeg') {
            imageFormat = 'image/jpeg'
          }
          debugger
          const finalImage = outputCanvas.toDataURL(imageFormat)

          modalHandler(finalImage)
        }
      }
    }
  }

  return (
    <Dialog
      onOpenChange={() => {
        setPhoto(null)
        setError('')
      }}
    >
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className={'max-w-[494px] h-[580px] gap-0 flex flex-col'}>
        <DialogHeader>
          <DialogTitle className={'px-6'}>Add a Profile Photo</DialogTitle>
        </DialogHeader>
        <div
          className={
            'flex justify-center items-center flex-col h-full relative'
          }
        >
          {error && (
            <div
              className={
                'absolute top-4 border border-danger-500 bg-danger-900 w-full max-w-[440px] max-h-[60px] px-6 py-1.5 flex justify-center items-center'
              }
            >
              <span className={'text-center'}>{error}</span>
            </div>
          )}
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
                ref={editorRef}
                scale={scale}
                width={320}
              />
            </div>
          )}
        </div>

        <DialogFooter
          className={`flex items-center ${
            photo ? 'justify-end' : 'justify-center mb-[100px]'
          }`}
        >
          {!photo ? (
            <Button
              onClick={() => {
                ref.current?.click()
                setError('')
              }}
              type={'button'}
            >
              Select from Computer
            </Button>
          ) : (
            <DialogClose
              asChild
              className={'mr-6'}
            >
              <Button
                disabled={!photo}
                onClick={handleSave}
                type={'button'}
              >
                Save
              </Button>
            </DialogClose>
          )}
          <input
            accept={'image/*, .png, .jpg, .jpeg'}
            className={'opacity-0 h-0 w-0 leading-none hidden p-0 m-0'}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null

              const fileSize = file && file.size / (1024 * 1024)

              const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

              if (fileSize && fileSize > 10) {
                setError('Error! Photo size must be less than 10 MB!')
              } else if (file && !allowedTypes.includes(file.type)) {
                setError(
                  'Error! The format of the uploaded photo must be PNG and JPEG'
                )
              } else if (file) {
                setPhoto(URL.createObjectURL(file))
                setPhotoType(file.type)
                setError('')
              } else {
                setError('Choose file')
              }
            }}
            ref={ref}
            type={'file'}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
