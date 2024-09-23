import { ToastClassName } from 'react-toastify'

export const contextClass = {
  dark: '',
  default: '',
  error: 'bg-danger-900 border border-danger-500',
  info: '',
  success: 'bg-success-900 border border-success-500',
  warning: '',
}

export const getToastClassName: ToastClassName = (context) =>
  'min-w-[387px] ' +
  contextClass[context?.type || 'success'] +
  ' relative flex items-center box-border py-2 px-6 min-h-[48px] rounded-sm overflow-hidden cursor-pointer'

export const toastPositions = [
  'top-left',
  'top-right',
  'top-center',
  'bottom-left',
  'bottom-right',
  'bottom-center',
] as const
