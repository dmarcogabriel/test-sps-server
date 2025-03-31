const { z } = require("zod");

const nameSchema = z.string({
  required_error: "Campo Nome é obrigatório."
});


module.exports = z.object({
  name: nameSchema
});
