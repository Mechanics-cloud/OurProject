import {
  Bounce,
  ToastContainer as Container,
  ToastContainerProps,
} from 'react-toastify'

import { Close } from '@/assets/icons/filledIcons'
import { typographyVariants } from '@/common/components'
import { getToastClassName } from '@/common/components/toast/helpers'

export const ToastContainer = (args: ToastContainerProps) => (
  <Container
    autoClose={3000}
    bodyClassName={typographyVariants({ variant: 'reg16' })}
    closeButton={
      <Close
        className={'min-w-6 min-h-6 ml-auto'}
        height={'24px'}
        width={'24px'}
      />
    }
    closeOnClick
    hideProgressBar
    icon={false}
    position={'bottom-left'}
    toastClassName={getToastClassName}
    transition={Bounce}
    {...args}
  />
)
