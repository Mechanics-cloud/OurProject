import { en, ru } from '@locales/index'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru

  return { t }
}
