import { AddPhoto } from '@/features/profile/general-info/AddPhoto'
import { GeneralInfoForm } from '@/features/profile/general-info/GeneralInfoForm'

export const GeneralInfo = () => {
  return (
    <div className={'flex gap-10 w-full mt-6'}>
      <AddPhoto />
      <GeneralInfoForm />
    </div>
  )
}
