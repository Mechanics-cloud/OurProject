import { Card, Checkbox, Typography, useTranslation } from '@/common'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'

import { subscriptionStore } from '../../model'

type Props = {
  isShow: boolean
}

export const AutoRenewal = observer(({ isShow }: Props) => {
  const { t } = useTranslation()

  const currentPayments = subscriptionStore.currentPayments

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          initial={{ height: 0 }}
          style={{ overflow: 'hidden' }}
        >
          <label>
            <Typography
              className={'mb-1.5 mt-8'}
              variant={'h3'}
            >
              {t.profileMyPayments.currentSubscription}
            </Typography>
            <Card className={'flex gap-12'}>
              <div>
                <Typography
                  className={'text-light-900'}
                  variant={'reg14'}
                >
                  {t.profileMyPayments.expireAt}
                </Typography>
                <Typography
                  className={'text-[14px]'}
                  variant={'semiBoldSmall'}
                >
                  {new Date(
                    currentPayments?.data.at(-1)?.endDateOfSubscription!
                  ).toLocaleDateString('ru')}
                </Typography>
              </div>
              <div>
                <Typography
                  className={'text-light-900'}
                  variant={'reg14'}
                >
                  {t.profileMyPayments.nextPayment}
                </Typography>
                <Typography
                  className={'text-[14px]'}
                  variant={'semiBoldSmall'}
                >
                  {currentPayments?.hasAutoRenewal
                    ? new Date(
                        currentPayments?.data.at(-1)?.endDateOfSubscription!
                      ).toLocaleDateString('ru')
                    : '-'}
                </Typography>
              </div>
            </Card>
          </label>
          <div className={'mt-3'}>
            <Checkbox
              checked={currentPayments?.hasAutoRenewal}
              disabled={!currentPayments?.hasAutoRenewal}
              label={t.profileMyPayments.autoRenewal}
              onCheckedChange={subscriptionStore.canceledAutoRenewal}
            ></Checkbox>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
