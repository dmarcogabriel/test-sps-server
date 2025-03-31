const db = require("../db/db");

module.exports = {
  findAll() {
    return db.users;
  },

  findById(userId) {
    return db.users.find(user => user.id === userId);
  },

  findByEmail(email) {
    return db.users.find(user => user.email === email);
  },

  create(user) {
    const lastUser = db.users[db.users.length - 1];
    db.users.push({ id: lastUser.id + 1, ...user });
  },

  updateById(userId, data) {
    db.users = db.users.map(user => {
      if (user.id === Number.parseInt(userId)) {
        return {...user, ...data };
      }
      return user;
    });
  },

  deleteById(userId) {
    db.users = db.users.filter(user => user.id !== userId);
  }
}