/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const mongoose = require('mongoose');

const personService = require('./person.service');
const { idCorrecter } = require('./utils');
const Vaccine = require('./models/vaccine.model');

const vaccineToObjectId = async (vaccine = '') => {
  const vaccineObj = await Vaccine.findOne({ name: vaccine }, { _id: 1 });

  if (vaccineObj) {
    return mongoose.Types.ObjectId(vaccineObj._id);
  }

  return '';
};

exports.findOne = async (req, res, next) => {
  const person = await personService.findOne(req.params.id);
  if (!person) {
    return next(new createError.NotFound('Person is not found'));
  }
  res.json(person);
  return person;
};

exports.countAllPeople = async (req, res) => {
  const people = await personService.findAll();
  res.json(people.length);
};

exports.getVaccinatedPeople = async (req, res) => {
  const vaccinatedPeople = await personService.findAll({ 'vaccine.count': { $ne: 0 } });
  res.json(vaccinatedPeople);
};

// Get status that person is vaccinated.
exports.isVaccinated = async (req, res, next) => {
  let { id } = req.params;

  if (!idCorrecter(id)) {
    return next(new createError.BadRequest('Bad person ID!'));
  }

  id = idCorrecter(id);

  const person = await personService.findOne(id);

  if (!person) {
    return next(new createError.NotFound('The person cannot be found!'));
  }

  const isVaccinated = !!person.vaccine.count;
  res.json(isVaccinated);
  return isVaccinated;
};

exports.createANewPerson = async (req, res, next) => {
  const { firstName, lastName, vaccine } = req.body;
  const people = await personService.findAll();
  const _id = people[people.length - 1]._id + 1;

  if (!firstName || !lastName) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  let newPerson = {};
  if (vaccine && vaccine.vaccine) {
    vaccine.vaccine = !vaccine.vaccine ? vaccine.vaccine = '' : vaccine.vaccine;
    vaccine.count = !vaccine.count ? vaccine.count = 0 : vaccine.count;

    newPerson = {
      _id,
      firstName,
      lastName,
      vaccine: {
        vaccine: await vaccineToObjectId(vaccine.vaccine),
        count: vaccine.count,
      },
    };
  } else {
    newPerson = {
      _id,
      firstName,
      lastName,
      vaccine: {
        count: 0,
      },
    };
  }

  const newEntity = await personService.create(newPerson);
  res.status(201);
  res.json(newEntity);
  return newEntity;
};

exports.updateTypeOfVaccine = async (req, res, next) => {
  let { id, vaccine } = req.params;

  if (!idCorrecter(id)) {
    return next(new createError.BadRequest('Bad person ID!'));
  }

  id = idCorrecter(id);
  vaccine = vaccine.trim();

  const person = await personService.findOne(id);

  if (!person) {
    return next(new createError.NotFound('The person cannot be found!'));
  }

  person.vaccine.vaccine = await vaccineToObjectId(vaccine);

  try {
    const updatedPerson = await personService.update(id, person);
    res.json(updatedPerson);
    return updatedPerson;
  } catch {
    return next(new createError.NotFound('The person cannot be found!'));
  }
};

exports.deletePeopleWithCertainVaccine = async (req, res) => {
  let { vaccine } = req.params;
  vaccine = vaccine.trim();
  const vaccineId = await vaccineToObjectId(vaccine);

  const filteredPeople = await personService.findAll({ 'vaccine.vaccine': vaccineId });
  filteredPeople.forEach(async (person) => {
    await personService.delete(person._id);
  });

  if (filteredPeople.length < 1) {
    res.status(404);
    res.json(false);
  } else {
    res.json([]);
  }
};
