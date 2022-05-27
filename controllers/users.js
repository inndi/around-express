const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      // res.send({ data: JSON.parse(user) });
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send({ data: JSON.parse(user) });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
};

module.exports.createUser = (req, res) => {

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
};