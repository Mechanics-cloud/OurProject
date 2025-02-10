import { Typography } from '@/common'
type Props = {
  label: string
  value: number | string
}
export const PaymentDetailRow = ({ label, value }: Props) => {
  return (
    <div className={'flex justify-between'}>
      <Typography variant={'reg14'}>{label}</Typography>
      <Typography variant={'bold14'}>{value}</Typography>
    </div>
  )
}
