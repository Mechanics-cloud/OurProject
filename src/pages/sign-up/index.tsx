import {
  GithubSvgrepoCom31,
  GoogleSvgrepoCom1,
} from '@/assets/icons/filledIcons'
import { Typography } from '@/common/components'
import { Card } from '@/common/components/card'

const SignUp = () => {
  return (
    <div className={'h-screen grid place-items-center'}>
      <Card asChild>
        <form>
          <Typography
            className={'text-center mb-3'}
            variant={'h1'}
          >
            Sign Up
          </Typography>
          <div className={'flex gap-14 mb-6'}>
            <GoogleSvgrepoCom1
              height={36}
              width={36}
            />
            <GithubSvgrepoCom31
              height={36}
              width={36}
            />
          </div>
        </form>
      </Card>
    </div>
  )
}

export default SignUp
