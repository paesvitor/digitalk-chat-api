const Message = require("../models/Message");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const messages = await Message.find({}).populate("user");

    res.status(200).send(messages);
    try {
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async store(req, res) {
    try {
      const { user: user_id } = req.body;
      const { io } = req;

      const user = await User.findById(user_id);

      !user &&
        res.status(400).send({ message: "Erro, id de usuário não existe" });

      let message = await Message.create(req.body);
      message = await message.populate("user").execPopulate();

      io.emit("message", message);

      res.send(message);
    } catch (error) {
      res.status(400).send({ message: String(error) });
    }
  }
};
