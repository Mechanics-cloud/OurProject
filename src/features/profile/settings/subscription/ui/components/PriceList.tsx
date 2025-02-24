import { Loader, RadioGroupType } from '@/common'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { subscriptionStore } from '../../model'
import { BankRedirectButtons } from './BankRedirectButtons'
import { PaymentRadioGroup } from './PaymentRadioGroup'

type Props = {
  isShow: boolean
  label: string
} & RadioGroupType

export const PriceList = observer(({ isShow, label, ...rest }: Props) => {
  const isRedirect = subscriptionStore.isRedirect

  return (
    <>
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
      {isRedirect && <Loader />}
    </>
  )
})
