const Message = require("../models/Message");

module.exports = {
  async index(req, res) {
    const messages = await Message.find({});

    res.status(200).send(messages);
    try {
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async store(req, res) {
    try {
      const { text, user } = req.body;

      const user = await User.findById(user);

      if (!user) {
        res.status(400).send({ message: "Erro, id de usuário não existe" });
      }

      const message = await Message.create(req.body);

      res.send(message);
    } catch (error) {
      res.status(400).send({ message: String(error) });
    }
  }
};
