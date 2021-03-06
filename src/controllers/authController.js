const User = require("../models/User");

module.exports = {
  async show(req, res) {
    try {
      const { username, password } = req.body;

      !username && res.status(400).send({ message: "Preencha o usuário" });
      !password && res.status(400).send({ message: "Preencha a senha" });

      const user = await User.findOne({ username }).select("+password");

      !user && res.status(400).send({ message: "Usuário não encontrado" });

      user.password !== password &&
        res.status(400).send({ message: "Senha inválida" });

      res.status(200).send({ authenticated: true, user });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async store(req, res) {
    try {
      const { username, password, confirmPassword } = req.body;

      password !== confirmPassword &&
        res.status(400).send({ message: "Senhas não coincidem" });

      const user = await User.findOne({ username });

      if (user) {
        res.status(400).send({ message: "Esse usuário já existe" });
      }

      const result = await User.create({ username, password });

      res.send({ authenticated: true, user: result });
    } catch (error) {
      res.status(400).send({ message: String(error) });
    }
  }
};
