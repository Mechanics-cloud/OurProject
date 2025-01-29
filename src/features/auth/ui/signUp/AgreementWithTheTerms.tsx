import { PublicPaths, Typography, useTranslation } from '@/common'

export const AgreementWithTheTerms = () => {
  const { t } = useTranslation()

  return (
    <div className={`flex items-center gap-1 flex-wrap`}>
      <span>{t.signUp.labels.agree}</span>
      <Typography
        className={'whitespace-nowrap'}
        href={PublicPaths.termsOfService}
        variant={'smallLink'}
      >
        {t.signUp.terms}
      </Typography>
      {t.signUp.labels.and}
      <Typography
        className={'whitespace-nowrap'}
        href={PublicPaths.privacyPolicy}
        variant={'smallLink'}
      >
        {t.signUp.policy}
      </Typography>
    </div>
  )
}
