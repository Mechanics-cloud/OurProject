import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const signInSchema = (t: LocaleType) => {
  return z.object({
    email: z
      .string({ required_error: t.signInForm.schemaErrors.emailRequiredError })
      .email({
        message: t.signInForm.schemaErrors.email,
      }),
    password: z
      .string()
      .min(6, { message: t.signInForm.schemaErrors.minCharPassword })
      .max(20, { message: t.signInForm.schemaErrors.maxCharPassword })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/,
        {
          message:
            t.signInForm.schemaErrors.passwordComposition +
            ' a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
        }
      ),
  })
}

export type SignInFields = z.infer<ReturnType<typeof signInSchema>>
