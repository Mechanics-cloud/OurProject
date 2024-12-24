import { Typography, useTranslation } from '@/common'
import { Paths } from '@/common/paths'

export const AgreementWithTheTerms = () => {
  const { t } = useTranslation()

  return (
    <div className={`flex items-center gap-1 flex-wrap`}>
      <span>{t.signUp.labels.agree}</span>
      <Typography
        className={'whitespace-nowrap'}
        href={Paths.termsOfService}
        variant={'smallLink'}
      >
        {t.signUp.terms}
      </Typography>
      {t.signUp.labels.and}
      <Typography
        className={'whitespace-nowrap'}
        href={Paths.privacyPolicy}
        variant={'smallLink'}
      >
        {t.signUp.policy}
      </Typography>
    </div>
  )
}
