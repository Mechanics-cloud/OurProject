import { AddPhoto } from '@/features/profile/settings/generalInfo/ui/AddPhoto'
import { GeneralInfoForm } from '@/features/profile/settings/generalInfo/ui/GeneralInfoForm'

export const GeneralInfo = () => {
  return (
    <div
      className={
        'flex gap-10 w-full mt-6 relative after:absolute after:contain-content after:h-[1px] after:top-[90%] after:left-0 after:w-full after:bg-dark-300'
      }
    >
      <AddPhoto />
      <GeneralInfoForm />
    </div>
  )
}
