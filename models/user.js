const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/[\w.]*[\w\W]+\.[\w\W]+$/.test(v)
      },
      message: props => `${props.value} is not a valid address!`
    }
  }
});

module.exports = mongoose.model('user', userSchema);