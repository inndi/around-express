const express = require('express');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '6290ae8fb3ff4b8e7d9f2867' // paste the _id of the test user created in the previous step
  };

  next();
});

app.use(helmet());
app.use('/users', userRouter);
app.use('/cards', cardRouter);



const { PORT = 3000 } = process.env;

app.get('*', (req, res) => res.status(404).send({ message: 'Requested resource not found' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
