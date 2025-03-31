const { Router } = require("express");
const userRepository = require('../repositories/user.repository')
const { authenticate } = require('../middlewares/auth.middleware')

const routes = Router();

routes.post("/", authenticate, ({ body }, res) => {
  userRepository(body);

  res.status(200).json({ message: "Usuário criado com sucesso." });
});

routes.get("/", authenticate, (_req, res) => {
  const users = userRepository.findAll();

  res.json({ data: users });
});

routes.get("/me", authenticate, ({ userId }, res) => {
  const user = userRepository.findById(userId);

  res.json({ data: user });
})

routes.get("/:userId", authenticate, ({ params }, res) => {
  const user = userRepository.findById(params.userId);

  res.json({ data: user });
});

routes.patch("/:userId", authenticate, ({ params, body }, res) => {
  userRepository.updateById(params.userId, body);

  res.json({ message: "Usuário atualizado com sucesso." });
});

routes.delete("/:userId", authenticate, ({ params }, res) => {
  userRepository.deleteById(params.userId);

  res.json({ message: "Usuário removido com sucesso." });
});

module.exports = routes;