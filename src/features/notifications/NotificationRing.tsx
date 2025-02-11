import { OutlineBell } from '@/assets/icons'

export const NotificationRing = () => {
  return (
    <button
      className={'cursor-pointer mr-12 hidden lg:block'}
      onClick={() => alert('notification' ?? 'empty')}
      type={'button'}
    >
      <OutlineBell className={'size-6'} />
    </button>
  )
}
