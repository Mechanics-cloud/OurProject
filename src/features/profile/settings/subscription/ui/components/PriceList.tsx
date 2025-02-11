import { RadioGroupType, cn } from '@/common'
import { AccountTypeValue } from '@/common/enums'

import { PaymentRadioGroup } from './PaymentRadioGroup'

type Props = {
  accountValue: string
  label: string
  onPay: () => void
} & RadioGroupType

export const PriceList = ({ accountValue, label, onPay, ...rest }: Props) => {
  return (
    <div
      className={cn(
        `transition-opacity duration-300 ease-in opacity-0 `,
        accountValue === AccountTypeValue.Business && ' opacity-100'
      )}
    >
      {accountValue === AccountTypeValue.Business && (
        <>
          <PaymentRadioGroup
            label={label}
            {...rest}
          />

          <button
            onClick={onPay}
            type={'button'}
          >
            Pay
          </button>
        </>
      )}
    </div>
  )
}
