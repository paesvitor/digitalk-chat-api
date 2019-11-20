const User = require("../models/User");

module.exports = {
  async show(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user.password !== password) {
      res.status(400).send({ message: "Senha inválida" });
    }

    res.status(200).send({ authenticated: true, user });
    try {
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async store(req, res) {
    try {
      const { username } = req.body;

      const user = await User.findOne({ username });

      if (user) {
        res.status(400).send({ message: "Esse usuário já existe" });
      }

      const result = await User.create(req.body);

      res.send(result);
    } catch (error) {
      res.status(400).send({ message: String(error) });
    }
  }
};
