const User = require("../models/User");

module.exports = {
  async show(req, res) {
    try {
      const { username, password } = req.body;

      if (!username) {
        res.status(400).send({ message: "Preencha o usuário" });
      }

      if (!password) {
        res.status(400).send({ message: "Preencha a senha" });
      }

      const user = await User.findOne({ username });

      if (!user) {
        res.status(400).send({ message: "Usuário não encontrado" });
      }

      if (user.password !== password) {
        res.status(400).send({ message: "Senha inválida" });
      }

      res.status(200).send({ authenticated: true, user });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async store(req, res) {
    try {
      const { username, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        res.status(400).send({ message: "Senhas não coincidem" });
      }

      const user = await User.findOne({ username });

      if (user) {
        res.status(400).send({ message: "Esse usuário já existe" });
      }

      const result = await User.create({ username, password });

      res.send({ authenticated: true, result });
    } catch (error) {
      res.status(400).send({ message: String(error) });
    }
  }
};
