import { ArrowBackOutline } from '@/assets/icons/outlineIcons'
import { useGoToTopButton } from '@/common/components/goTopButton/useGoToTopButton'
import { motion } from 'framer-motion'

export const GoTopButton = () => {
  const { controls, scrollToTopHandler, scrollToTopVariants } =
    useGoToTopButton()

  return (
    <motion.button
      animate={controls}
      className={'bg-dark-300 fixed right-7 bottom-7 p-2 rounded-sm'}
      initial={'hide'}
      onClick={scrollToTopHandler}
      type={'button'}
      variants={scrollToTopVariants}
    >
      <ArrowBackOutline
        className={'rotate-90'}
        height={'20'}
        width={'20'}
      />
    </motion.button>
  )
}
