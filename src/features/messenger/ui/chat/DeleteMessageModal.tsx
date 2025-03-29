import { Button, SimpleModal, Typography, useTranslation } from '@/common'

type Props = {
  chosenMessagesCount: number
  isModalOpen: boolean
  onDeleteMessageById: () => void
  onModalClose: () => void
}
export const DeleteMessageModal = ({
  chosenMessagesCount,
  isModalOpen,
  onDeleteMessageById,
  onModalClose,
}: Props) => {
  const { t } = useTranslation()

  return (
    <SimpleModal
      className={'w-40'}
      onOpenChange={onModalClose}
      open={isModalOpen}
      title={t.messenger.delete}
    >
      <div
        className={
          'w-full h-full flex flex-col items-center justify-center pt-2 pb-6 px-4 gap-7'
        }
      >
        <Typography variant={'bold16'}>
          {t.messenger.deleteConfirm(chosenMessagesCount)}
        </Typography>
        <div className={'flex items-center justify-end w-full h-full gap-6'}>
          <Button
            onClick={onDeleteMessageById}
            variant={'outline'}
          >
            {t.basic.yes}
          </Button>
          <Button onClick={onModalClose}>{t.basic.no}</Button>
        </div>
      </div>
    </SimpleModal>
  )
}
