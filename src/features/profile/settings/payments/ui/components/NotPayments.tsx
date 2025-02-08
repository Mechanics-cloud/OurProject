import { useTranslation } from '@/common'

export const NotPayments = () => {
  const { t } = useTranslation()

  return (
    <div className={'w-full h-[500px] flex items-center justify-center'}>
      {t.profileMyPayments.noPayments}
    </div>
  )
}
