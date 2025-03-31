const jwt = require('jsonwebtoken');

const SECRET_HASH = "dev"

function authenticate(req, res, next) {
  if (!req.headers.authorization) {
    res.status(404).json({ message: "Acesso negado." });
    return;
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, SECRET_HASH, undefined, (error, decoded) => {
    if (error) {
      res.status(404).json({ message: "Token Inválido ou expirado." });
      return;
    }

    req.userId = decoded.id;

    next();
  });
}

module.exports = {
  authenticate
};