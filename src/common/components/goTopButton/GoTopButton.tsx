import { ArrowBackOutline } from '@/assets/icons/outlineIcons'

export const GoTopButton = () => {
  const isBrowser = () => typeof window !== 'undefined'

  function scrollToTop() {
    if (!isBrowser()) {
      return
    }
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return (
    <button
      className={'bg-dark-300 fixed right-7 bottom-7 p-2 rounded-sm'}
      onClick={scrollToTop}
      type={'button'}
    >
      <ArrowBackOutline
        className={'rotate-90'}
        height={'20'}
        width={'20'}
      />
    </button>
  )
}
