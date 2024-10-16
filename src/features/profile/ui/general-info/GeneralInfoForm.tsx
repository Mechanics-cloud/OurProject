import React from 'react'

import CalendarOutline from '@/assets/icons/outlineIcons/CalendarOutline'
import {
  Button,
  Calendar,
  FormTextField,
  SelectItem,
  TextArea,
  TextField,
} from '@/common'
import { FormSelect } from '@/common/form/FormSelect'
import { useFillGeneralForm } from '@/features/profile/model/useFillGeneralForm'

export const GeneralInfoForm = React.forwardRef<HTMLFormElement>((_, ref) => {
  const {
    calendarOpenHandler,
    calendarRef,
    control,
    handleSubmit,
    onSubmit,
    register,
    selectDateHandler,
    toggleOpen,
  } = useFillGeneralForm()

  return (
    <form
      className={'w-full flex flex-col gap-6'}
      onSubmit={handleSubmit(onSubmit)}
      ref={ref}
    >
      <FormTextField
        control={control}
        label={'Username'}
        name={'username'}
        required
      />
      <FormTextField
        control={control}
        label={'First Name'}
        name={'firstName'}
        required
      />
      <FormTextField
        control={control}
        label={'Last Name'}
        name={'lastName'}
        required
      />
      <div className={'flex flex-col'}>
        <TextField
          label={'Date of Birth'}
          {...register('date')}
        >
          <CalendarOutline
            className={
              'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 right-3 cursor-pointer'
            }
            onClick={calendarOpenHandler}
          />
          {toggleOpen && (
            <div ref={calendarRef}>
              <Calendar
                className={'absolute'}
                onDayClick={selectDateHandler}
              />
            </div>
          )}
        </TextField>
        <div className={'flex gap-6'}>
          <FormSelect
            className={'w-full'}
            control={control}
            label={'Country'}
            name={'country'}
            placeholder={'Country'}
          >
            <SelectItem value={'Austria'}>Austria</SelectItem>
            <SelectItem value={'Russia'}>Russia</SelectItem>
          </FormSelect>
          <FormSelect
            className={'w-full'}
            control={control}
            label={'City'}
            name={'city'}
            placeholder={'City'}
          >
            <SelectItem value={'Linz'}>Linz</SelectItem>
            <SelectItem value={'Moscow'}>Moscow</SelectItem>
          </FormSelect>
        </div>
      </div>
      <TextArea
        label={'About me'}
        maxLength={200}
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
