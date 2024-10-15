import React from 'react'
import { useForm } from 'react-hook-form'

import CalendarOutline from '@/assets/icons/outlineIcons/CalendarOutline'
import { Button, Select, SelectItem, TextArea, TextField } from '@/common'
import AuthStore from '@/features/auth/model/authStore'

type FormData = {
  aboutMe?: string
  city?: string
  country?: string
  firstName: string
  lastName: string
  username: string
}
export const GeneralInfoForm = React.forwardRef<HTMLFormElement>((_, ref) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()
  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const profile = AuthStore.profile

  return (
    <form
      className={'w-full flex flex-col gap-6'}
      onSubmit={handleSubmit(onSubmit)}
      ref={ref}
    >
      <TextField
        defaultValue={profile?.userName}
        label={'Username'}
        required
        {...register('username', { required: 'Username is required' })}
      />
      <TextField
        label={'First Name'}
        required
        {...register('firstName', { required: 'First Name is required' })}
      />
      <TextField
        label={'Last Name'}
        required
        {...register('lastName', { required: 'Last Name is required' })}
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
            {...register('country')}
          >
            <SelectItem value={'Austria'}>Austria</SelectItem>
            <SelectItem value={'Russia'}>Russia</SelectItem>
          </Select>
          <Select
            className={'w-full'}
            defaultValue={'Linz'}
            label={'City'}
            {...register('city')}
          >
            <SelectItem value={'Linz'}>Linz</SelectItem>
            <SelectItem value={'Vienna'}>Vienna</SelectItem>
          </Select>
        </div>
      </div>
      <TextArea
        label={'About me'}
        {...register('aboutMe')}
      />
      <div className={'flex justify-end'}>
        <Button
          type={'submit'}
          variant={'primary'}
        >
          Save Changes
        </Button>
      </div>
    </form>
  )
})
