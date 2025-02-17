import { RadioGroupType } from '@/common'
import { AnimatePresence, motion } from 'framer-motion'

import { BankRedirectButtons } from './BankRedirectButtons'
import { PaymentRadioGroup } from './PaymentRadioGroup'

type Props = {
  isShow: boolean
  label: string
} & RadioGroupType

export const PriceList = ({ isShow, label, ...rest }: Props) => {
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
          <BankRedirectButtons />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
