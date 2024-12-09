import { useState } from 'react'

export const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState<boolean>(initialState)
  const toggle = () => setState((prevState) => !prevState)

  return { state, toggle }
}
