import { ImageOutline } from '@/assets/icons/outlineIcons'
import { Button } from '@/common'

export const AddPhoto = () => {
  return (
    <div>
      <div
        className={
          'w-[192px] h-[192px] rounded-full bg-dark-500 flex justify-center items-center mb-[30px]'
        }
      >
        <ImageOutline
          height={'48px'}
          width={'48px'}
        />
      </div>
      <Button
        className={'min-w-[196px]'}
        variant={'outline'}
      >
        Add a Profile Photo
      </Button>
    </div>
  )
}
