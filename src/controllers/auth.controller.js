const { Router } = require("express");
const jwt = require('jsonwebtoken')
const { findByEmail } = require('../repositories/user.repository')

const SECRET_HASH = "dev"

const routes = Router();

routes.post("/", ({ body }, res) => {
  const user = findByEmail(body.email);

  if (!user || user.password !== body.password) {
    res.status(400).json({ message: "Usuário ou Senha incorretos." });
    return;
  }

  const token = jwt.sign(
    { id: user.id, type: user.type },
    SECRET_HASH
  );

  res.status(200).json({ token });
})

module.exports = routes;