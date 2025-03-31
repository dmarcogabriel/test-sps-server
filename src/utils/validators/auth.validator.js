const { z } = require("zod");

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

module.exports = z.object({
  email: emailSchema,
  password: passwordSchema,
});
