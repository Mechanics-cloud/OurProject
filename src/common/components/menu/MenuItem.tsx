import React, {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
  SVGProps,
} from 'react'

import { PathsType } from '@/common/components/menu/Menu'
import Link from 'next/link'

type Props = {
  currentPath: string
  iconFilled: MemoExoticComponent<
    ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
    >
  >
  iconOutlined: MemoExoticComponent<
    ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
    >
  >
  path: PathsType
} & ComponentPropsWithoutRef<'svg'>

export const MenuItem = ({
  currentPath,
  iconFilled,
  iconOutlined,
  path,
}: Props) => {
  const IconFilled = iconFilled
  const IconOutlined = iconOutlined

  return (
    <li>
      <Link href={path}>
        {currentPath.indexOf(path) !== -1 &&
        currentPath.length === path.length ? (
          <IconFilled className={'w-6 h-6 text-accent-500'} />
        ) : (
          <IconOutlined className={'w-6 h-6'} />
        )}
      </Link>
    </li>
  )
}
