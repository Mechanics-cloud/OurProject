import { RefObject } from 'react'

import { ArrowBackOutline } from '@/assets/icons/outlineIcons'
import { Nullable, Tooltip, cn } from '@/common'
import { useGoToTopButton } from '@/common/components/goTopButton/useGoToTopButton'
import { motion } from 'framer-motion'

type Props = {
  scrollInElementRef?: Nullable<RefObject<HTMLDivElement>>
}

export const GoTopButton = ({ scrollInElementRef }: Props) => {
  const { controls, isBrowser, onScrollToTop, scrollToTopVariants, t } =
    useGoToTopButton(scrollInElementRef)

  if (!isBrowser) {
    return
  }

  return (
    <motion.button
      animate={controls}
      className={cn(
        'hidden lg:block bg-dark-300 fixed right-7 p-2 rounded-sm bottom-20 lg:bottom-7'
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
