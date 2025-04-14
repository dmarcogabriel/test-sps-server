import { z } from 'zod';

import { IUser } from '@app/core/users/user.entity';
import Validator from '@app/shared/utils/Validator';

const emailSchema = z
  .string({
    required_error: 'Campo E-mail é obrigatório.'
  })
  .email('E-mail inválido.');
const passwordSchema = z
  .string({
    required_error: 'Campo senha é obrigatório.'
  })
  .min(4, 'Senha deve conter ao menos 4 dígitos.');

const authValidatorSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const authorizeUserValidator = () => new Validator<Pick<IUser, "email" | "password">>(authValidatorSchema);
