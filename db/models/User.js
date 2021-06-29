const { Schema, model } = require('mongoose');

const schema = new Schema({
  phoneNumber: { type: String },
  email: { type: String }
});

module.exports = model('User', schema);