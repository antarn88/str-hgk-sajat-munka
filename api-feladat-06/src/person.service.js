const Person = require('./models/person.model');

exports.create = (personData) => {
  const person = new Person(personData);
  return person.save();
};

exports.findAll = (filterRule = {}) => Person.find(filterRule);

exports.findOne = (id) => Person.findById(id);

exports.update = (id, updatedData) => Person.findByIdAndUpdate(id, updatedData, {
  new: true, useFindAndModify: false,
});

exports.delete = (id) => Person.findByIdAndDelete(id);

// exports.insertMany = (dataArray) => Person.insertMany(dataArray);
