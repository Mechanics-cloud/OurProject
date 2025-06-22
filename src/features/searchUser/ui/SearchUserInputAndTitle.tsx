import { ChangeEvent, ElementRef, forwardRef } from 'react'

import { TextField, Typography, useTranslation } from '@/common'

type Props = {
  inputText: string
  setInputText: (value: string) => void
}
export const SearchUserInputAndTitle = forwardRef<ElementRef<'input'>, Props>(
  ({ inputText, setInputText }, inputRef) => {
    const { t } = useTranslation()

    const onInputText = (e: ChangeEvent<HTMLInputElement>) => {
      setInputText(e.currentTarget.value)
    }

    return (
      <div>
        <Typography
          className={'mt-9'}
          variant={'h1'}
        >
          {t.search.mainTitle}
        </Typography>
        <TextField
          autoFocus
          bottomMarginForError={false}
          className={'w-full mt-3 '}
          innerInputClassName={'pr-8'}
          label={''}
          onChange={onInputText}
          placeholder={t.search.placeholder}
          ref={inputRef}
          type={'search'}
          value={inputText}
        />
      </div>
    )
  }
)
