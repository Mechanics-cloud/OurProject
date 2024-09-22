import { ComponentPropsWithRef, ElementRef, forwardRef } from "react"

type Props = ComponentPropsWithRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>((props) => {
  return <div ref={ref}/>
})
