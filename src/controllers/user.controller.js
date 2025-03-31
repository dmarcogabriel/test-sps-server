const { Router } = require("express");
const userRepository = require('../repositories/user.repository')
const { authenticate } = require('../middlewares/auth.middleware')
const createUserValidator = require('../utils/validators/createUser.validator')
const updateUserValidator = require('../utils/validators/updateUser.validator')

const routes = Router();

routes.post("/", authenticate, ({ body }, res) => {
  try {
    const validated = createUserValidator.parse(body);
    userRepository(validated);
  
    res.status(200).json({ message: "Usuário criado com sucesso." });
  } catch (e) {
    if (e.name === "ZodError") {
      res
        .status(400)
        .json({ errors: e.issues.map(issue => issue.message )});
      return;
    }

    res.status(500).json({ message: "Erro ao criar usuário, tente novamente mais tarde." });
  }
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
  try {
    const validated = updateUserValidator.parse(body);
    userRepository.updateById(params.userId, validated);
  
    res.json({ message: "Usuário atualizado com sucesso." });
  } catch (e) {
    if (e.name === "ZodError") {
      res
        .status(400)
        .json({ errors: e.issues.map(issue => issue.message )});
      return;
    }

    res.status(500).json({ message: "Erro ao atualizar usuário, tente novamente mais tarde." });
  }
});

routes.delete("/:userId", authenticate, ({ params }, res) => {
  userRepository.deleteById(params.userId);

  res.json({ message: "Usuário removido com sucesso." });
});

module.exports = routes;