const mongoose = require('mongoose');

const VaccineSchema = mongoose.Schema({
  name: String,
  efficiency: {
    type: Number,
    min: 1,
    max: 100,
  },
}, {
  timestamps: false,
  versionKey: false,
});

module.exports = mongoose.model('Vaccine', VaccineSchema);
