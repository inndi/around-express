const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'cards not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'invalid data passed to the methods for creating a card' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id)
    .orFail()
    .then(() => res.send({ message: 'card deleted' }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'card not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send({ message: 'like added' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'card not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send({ message: 'like deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'card not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};
