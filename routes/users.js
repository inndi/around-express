const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fsPromises.readFile(USERS_PATH, { encoding: 'utf8' })
    .then((users) => {
      res.send({ data: JSON.parse(users) });
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
});

router.get('/users/:id', (req, res) => {
  fsPromises.readFile(USERS_PATH, { encoding: 'utf8' })
    .then((users) => {
      const parsedUsersData = JSON.parse(users);
      const userData = parsedUsersData.find((user) => user._id === req.params.id);
      if (!userData) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send({ data: userData });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
});

module.exports = router;
