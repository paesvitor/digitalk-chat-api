const Message = require("../models/Message");
const User = require("../models/User");

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
      const { text, user: user_id } = req.body;

      const user = await User.findById(user_id);

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
