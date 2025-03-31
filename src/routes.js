const { Router } = require("express");
const userController = require('./controllers/user.controller')
const authController = require('./controllers/auth.controller')

const routes = Router();

routes.get("/", (_req, res) => {
  res.send("Server Status: OK");
});

routes.use("/users", userController);
routes.use("/auth", authController);

module.exports = routes;
