const { Router } = require("express");
const jwt = require('jsonwebtoken')
const { findByEmail } = require('../repositories/user.repository')
const authValidator = require('../utils/validators/auth.validator')

const SECRET_HASH = "dev"

const routes = Router();

routes.post("/", ({ body }, res) => {
  try {
    const validated = authValidator.parse(body);
    const user = findByEmail(validated.email);
  
    if (!user || validated.password !== validated.password) {
      res.status(400).json({ message: "Usuário ou Senha incorretos." });
      return;
    }
  
    const token = jwt.sign(
      { id: user.id, type: user.type },
      SECRET_HASH
    );
  
    res.status(200).json({ token });
  } catch (e) {
    if (e.name === "ZodError") {
      res
        .status(400)
        .json({ errors: e.issues.map(issue => issue.message )});
      return;
    }

    res.status(500).json({ message: "Erro ao autenticar sessão, tente novamente mais tarde." });
  }
})

module.exports = routes;