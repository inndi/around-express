const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards })
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.send({ message: `An ${err}  error has occurred` }));
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id)
    .then(() => res.send({ message: 'The card deleted' }))
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
};