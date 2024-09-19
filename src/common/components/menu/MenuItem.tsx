import React, {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
  SVGProps,
} from 'react'

import { PathsType } from '@/common/components/menu/Menu'
import Link from 'next/link'

type LinkProps = {
  currentPath: string
  path: PathsType
}

type Props = {
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
} & ComponentPropsWithoutRef<'svg'> &
  LinkProps

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
        {currentPath.indexOf(path) !== -1 ? (
          <IconFilled className={'w-6 h-6 text-accent-500'} />
        ) : (
          <IconOutlined className={'w-6 h-6'} />
        )}
      </Link>
    </li>
  )
}