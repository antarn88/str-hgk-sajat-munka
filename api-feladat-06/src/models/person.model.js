const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  vaccine: String,
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Person', PersonSchema);
