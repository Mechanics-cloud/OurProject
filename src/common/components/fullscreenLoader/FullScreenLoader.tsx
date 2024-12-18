export const FullScreenLoader = () => {
  return (
    <div className={'w-full h-headCalc flex items-center justify-center'}>
      <div
        className={
          'loader text-gray-500 font-medium text-[25px] box-content h-10 px-[10px] py-[10px] flex rounded-[8px]'
        }
      >
        <p>loading</p>
        <div className={'words overflow-hidden relative'}>
          <span
            className={
              'word block h-full pl-[6px] text-accent-500 animate-spin'
            }
          >
            buttons
          </span>
          <span
            className={
              'word block h-full pl-[6px] text-accent-500 animate-spin'
            }
          >
            forms
          </span>
          <span
            className={
              'word block h-full pl-[6px] text-accent-500 animate-spin'
            }
          >
            switches
          </span>
          <span
            className={
              'word block h-full pl-[6px] text-accent-500 animate-spin1'
            }
          >
            cards
          </span>
          <span
            className={
              'word block h-full pl-[6px] text-accent-500 animate-spin'
            }
          >
            buttons
          </span>
        </div>
      </div>
    </div>
  )
}
