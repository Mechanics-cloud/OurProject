import { useEffect } from 'react'

import { en, ru } from '@locales/index'
import { useRouter } from 'next/router'

export const useTranslation = (formTrigger?: () => void) => {
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru

  useEffect(() => {
    if (formTrigger) {
      formTrigger()
    }
  }, [router.locale])

  return { t }
}
