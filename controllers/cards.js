const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards })
    })
    .catch(() => { res.status(500).send({ message: 'An error has occurred' }) });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => {
      res.send({ data: card })
    })
    .catch(() => { res.send({ message: 'An error has occurred' }) });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id)
    .then(() => res.send({ message: 'The card deleted' }))
    .catch(() => { res.status(500).send({ message: 'An error has occurred' }) });
};