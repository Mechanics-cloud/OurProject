'use client'

import * as React from 'react'

import { Close } from '@/assets/icons/filledIcons'
import { cn } from '@/common/utils/cn'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { Typography, typographyVariants } from '../typography'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    ref={ref}
    {...props}
  />
))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

type ContentProps = {
  crossOff?: boolean
} & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ContentProps
>(({ children, className, crossOff, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        '  fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-dark-100 rounded-sm bg-dark-300 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      onOpenAutoFocus={(e) => {
        e.preventDefault()
      }}
      ref={ref}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          'focus-visible:outline-none focus-within:bg-dark-100   w-6 h-6 absolute right-[12px] top-[17px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
          crossOff && 'hidden'
        )}
      >
        <Close className={'w-full h-full'} />
        <span className={'sr-only'}>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'p-3 flex flex-col space-y-1.5 border-b border-dark-100 ',
      className
    )}
    {...props}
  />
)

DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('px-3 pb-9', className)}
    {...props}
  />
)

DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      typographyVariants({ variant: 'h1' }),
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </DialogPrimitive.Title>
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ children, className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn(
      'px-3 text-sm text-muted-foreground',
      typographyVariants({ variant: 'reg16' }),
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </DialogPrimitive.Description>
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
