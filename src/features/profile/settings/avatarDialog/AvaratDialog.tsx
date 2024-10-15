import * as React from 'react'
import { ReactNode, useRef, useState } from 'react'

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
import Image from 'next/image'

type Props = {
  modalHandler: (item: string) => void
  triggerButton: ReactNode
}
export const AvaratDialog = ({ modalHandler, triggerButton }: Props) => {
  const [photo, setPhoto] = useState<null | string>(null)
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Dialog onOpenChange={() => setPhoto(null)}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className={'max-w-[500px] h-[550px]'}>
        <DialogHeader className={'m-0'}>
          <DialogTitle>Add a Profile Photo</DialogTitle>
        </DialogHeader>
        <div className={'flex justify-center items-center h-full'}>
          {!photo ? (
            <div
              className={
                'w-[192px] aspect-square flex justify-center items-center rounded-full bg-dark-500'
              }
            >
              <ImageOutline
                height={48}
                width={48}
              />
            </div>
          ) : (
            <Image
              alt={'avatar'}
              className={'object-cover w-[200px] h-[200px]'}
              height={200}
              src={photo}
              width={200}
            />
          )}
        </div>

        <DialogFooter className={'flex items-center  justify-end mr-6'}>
          {!photo ? (
            <Button
              onClick={() => ref.current?.click()}
              type={'button'}
            >
              Select from Computer
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                disabled={!photo}
                onClick={() => modalHandler(photo)}
                type={'button'}
              >
                Ok
              </Button>
            </DialogClose>
          )}
          <input
            accept={'image/*, .png, .jpg, .jpeg'}
            className={'opacity-0 h-0 w-0 leading-none hidden p-0 m-0'}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null

              file && setPhoto(URL.createObjectURL(file))
            }}
            ref={ref}
            type={'file'}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
