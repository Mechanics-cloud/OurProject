import { ArrowBackOutline } from '@/assets/icons/outlineIcons'
import { Tooltip, cn } from '@/common'
import { useGoToTopButton } from '@/common/components/goTopButton/useGoToTopButton'
import { motion } from 'framer-motion'

export const GoTopButton = () => {
  const {
    controls,
    isBrowser,
    isTablet,
    onScrollToTop,
    scrollToTopVariants,
    t,
  } = useGoToTopButton()

  if (!isBrowser) {
    return
  }

  return (
    <motion.button
      animate={controls}
      className={cn(
        'bg-dark-300 fixed right-7 bottom-7 p-2 rounded-sm',
        isTablet ? 'bottom-20' : ''
      )}
      initial={'hide'}
      onClick={onScrollToTop}
      type={'button'}
      variants={scrollToTopVariants}
    >
      <Tooltip title={t.goToTop}>
        <ArrowBackOutline
          className={'rotate-90'}
          height={'20'}
          width={'20'}
        />
      </Tooltip>
    </motion.button>
  )
}
