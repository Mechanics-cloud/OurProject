import { Typography, useTranslation } from '@/common'
import { Paths } from '@/common/paths'

export const AgreementWithTheTerms = () => {
  const { t } = useTranslation()

  return (
    <div className={`flex items-center gap-1 flex-wrap`}>
      <span>{t.signUpForm.labels.agree}</span>
      <Typography
        className={'whitespace-nowrap'}
        href={Paths.termsOfService}
        variant={'smallLink'}
      >
        {t.signUpForm.terms}
      </Typography>
      {t.signUpForm.labels.and}
      <Typography
        className={'whitespace-nowrap'}
        href={Paths.privacyPolicy}
        variant={'smallLink'}
      >
        {t.signUpForm.policy}
      </Typography>
    </div>
  )
}
