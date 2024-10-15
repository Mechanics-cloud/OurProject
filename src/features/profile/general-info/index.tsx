import { ImageOutline } from '@/assets/icons/outlineIcons'
import CalendarOutline from '@/assets/icons/outlineIcons/CalendarOutline'
import { Button, Select, SelectItem, TextArea, TextField } from '@/common'

export const GeneralInfo = () => {
  return (
    <div className={'flex gap-10 w-full mt-6'}>
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
      <div className={'w-full flex flex-col gap-6'}>
        <TextField
          label={'Username'}
          required
        />
        <TextField
          label={'First Name'}
          required
        />
        <TextField
          label={'Last Name'}
          required
        />
        <div className={'flex flex-col'}>
          <TextField label={'Date of Birth'}>
            <CalendarOutline
              className={
                'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 right-3 cursor-pointer'
              }
              onClick={() => alert('hello')}
            />
          </TextField>
          <div className={'flex gap-6'}>
            <Select
              className={'w-full'}
              defaultValue={'Austria'}
              label={'Country'}
            >
              <SelectItem value={'Austria'}>Austria</SelectItem>
              <SelectItem value={'Russia'}>Russia</SelectItem>
            </Select>
            <Select
              className={'w-full'}
              defaultValue={'Linz'}
              label={'City'}
            >
              <SelectItem value={'Linz'}>Linz</SelectItem>
              <SelectItem value={'Vienna'}>Vienna</SelectItem>
            </Select>
          </div>
        </div>
        <TextArea label={'About me'} />
        <div className={'flex justify-end'}>
          <Button variant={'primary'}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
