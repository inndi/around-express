const router = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

// const fsPromises = require('fs').promises;
// const path = require('path');

// const USERS_PATH = path.join(__dirname, '../data/users.json');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = router;
