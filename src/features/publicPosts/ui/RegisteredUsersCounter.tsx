import { Typography } from '@/common'

export const RegisteredUsersCounter = ({
  totalUsers,
}: {
  totalUsers: number
}) => {
  const totalUsersCountArr =
    totalUsers.toString().padStart(6, '0').split('') || []

  return (
    <div
      className={
        'flex justify-between items-center rounded-sm border border-dark-300 bg-dark-500 py-3 px-6'
      }
    >
      <Typography variant={'h2'}>Registered users:</Typography>
      <div
        className={
          'flex flex-nowrap p-3 bg-dark-700 rounded-sm border border-dark-300'
        }
      >
        {totalUsersCountArr.map((count, index) => (
          <Typography
            className={
              'flex justify-center items-center w-[30px] border-dark-300 h-6 border-r-2 last:border-none'
            }
            key={index}
            variant={'h2'}
          >
            {count}
          </Typography>
        ))}
      </div>
    </div>
  )
}
