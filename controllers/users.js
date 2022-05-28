const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'users not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'user not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'invalid data passed to the methods for creating a user' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { id } = req.params;

  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'invalid data passed to the methods for updating a user' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'user not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { id } = req.params;

  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'invalid data passed to the methods for updating a user' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'user not found' });
      } else {
        res.status(500).send({ message: `An error ${err.name} has occurred` });
      }
    });
};
