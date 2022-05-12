const express = require('express');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(userRouter);
app.use(cardRouter);

const { PORT = 3000 } = process.env;

app.get('*', (req, res) => res.status(404).send({ message: 'Requested resource not found' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
