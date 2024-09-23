import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { TextField, Typography } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import Link from 'next/link'

export const SignIn = () => {
  return (
    <>
      <Card className={'flex flex-col items-center'}>
        <Typography variant={'h1'}>Sign In</Typography>
        <div className={'flex gap-[60px] [&_svg]:w-9 [&_svg]:h-9 mt-3 mb-6'}>
          <button type={'button'}>
            <GoogleSvgrepoCom1 />
          </button>
          <button type={'button'}>
            <GithubSvgrepoCom31 />
          </button>
        </div>
        <form
          action={''}
          className={'flex flex-col gap-6 w-full'}
        >
          <TextField
            label={'Email'}
            type={'email'}
          />
          <TextField
            label={'Password'}
            type={'password'}
          />

          <Link
            className={'self-end mt-3'}
            href={'/*'}
          >
            Forgot Password
          </Link>

          <Button>Sign In</Button>
        </form>
        <Typography
          className={'mt-4'}
          variant={'reg16'}
        >
          Don’t have an account?
        </Typography>
        <Button variant={'text'}>Sign Up</Button>
      </Card>
    </>
  )
}
