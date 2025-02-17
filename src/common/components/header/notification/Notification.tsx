export const Notification = () => {
  return (
    <div
      className={
        'absolute -right-[10px] top-10 z-40 w-[355px] h-[424px] p-3 bg-dark-400 border border-light-900 rounded-lg shadow-lg'
      }
    >
      <div
        className={
          'absolute -top-[9px] right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-light-900'
        }
      ></div>
      <div
        className={
          'absolute -top-[8px] right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-dark-400'
        }
      ></div>
      <span className={'text-light-100'}>Notifications</span>
    </div>
  )
}
