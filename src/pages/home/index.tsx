import { withProtection } from '@/common'

const Home = () => {
  return (
    <div
      className={
        'w-full h-full flex justify-center items-center text-center text-3xl'
      }
    >
      HOME PAGE
    </div>
  )
}

export default withProtection(Home)
