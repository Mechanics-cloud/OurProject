import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
}

function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-sm px-6 py-1.5 inline-flex text-white bg-accent-500 ${variant === 'secondary' ? 'bg-dark-300' : ''} bg-accent-500`}
      {...props}
    />
  )
}

export { Button }
