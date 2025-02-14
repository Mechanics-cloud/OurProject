import { RadioGroupType, cn } from '@/common'
import { AccountTypeValue } from '@/common/enums'
import { AnimatePresence, motion } from 'framer-motion'

import { PaymentRadioGroup } from './PaymentRadioGroup'

type Props = {
  isShow: boolean
  label: string
  onPay: () => void
} & RadioGroupType

export const PriceList = ({ isShow, label, onPay, ...rest }: Props) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          initial={{ height: 0, opacity: 0 }}
          style={{ opacity: 0, overflow: 'hidden' }}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
