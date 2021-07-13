const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  vaccine: {
    vaccine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vaccine',
    },
    count: Number,
  },
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Person', PersonSchema);
