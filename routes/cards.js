const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
// const fsPromises = require('fs').promises;
// const path = require('path');

// const CARDS_PATH = path.join(__dirname, '../data/cards.json');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
