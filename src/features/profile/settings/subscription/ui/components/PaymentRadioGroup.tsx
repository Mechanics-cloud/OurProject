import { Card, RadioGroup, RadioGroupType, Typography, cn } from '@/common'

type Props = {
  label: string
} & RadioGroupType

export const PaymentRadioGroup = ({
  classNamesForGroup,
  label,
  ...rest
}: Props) => {
  return (
    <label>
      <Typography
        className={'mb-1.5 mt-8'}
        variant={'h3'}
      >
        {label}
      </Typography>
      <Card>
        <RadioGroup
          {...rest}
          classNamesForGroup={cn(
            'flex flex-col items-start gap-5',
            classNamesForGroup
          )}
        />
      </Card>
    </label>
  )
}
