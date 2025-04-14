import Validator from '@app/shared/utils/Validator';
import { z } from 'zod';
import { IUser } from './user.entity';

const passwordSchema = z
  .string({
    required_error: 'Campo senha é obrigatório.'
  })
  .min(4, 'Senha deve conter ao menos 4 dígitos.');

const nameSchema = z.string({
  required_error: "Campo Nome é obrigatório."
});
const emailSchema = z
  .string({
    required_error: 'Campo E-mail é obrigatório.'
  })
  .email('E-mail inválido.');
const typeSchema = z.union([
  z.literal('user'),
  z.literal('admin'),
], {
  required_error: "Campo Tipo de Usuário é obrigatório",
  invalid_type_error: "Tipos permitidos: 'admin' ou 'user'"
});

export const createUserValidator = () => {
  const createUserValidatorSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    type: typeSchema
  });

  return new Validator<IUser>(createUserValidatorSchema);
};


export const updateUserValidator = () => {
  const updateUserValidatorSchema = z.object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
    type: typeSchema.optional()
  });

  return new Validator<IUser>(updateUserValidatorSchema);
};
