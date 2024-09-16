import { ReactNode } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/common/components/select/Select'

type Props = {
  children: ReactNode
  className?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
  placeholder?: string
}
export const CustomSelect = ({
  children,
  className,
  defaultValue,
  disabled,
  label,
  placeholder,
}: Props) => {
  return (
    <Select
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectGroup className={className}>
        {label && <SelectLabel>{label}</SelectLabel>}
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </SelectGroup>
    </Select>
  )
}
