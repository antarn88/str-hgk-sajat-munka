/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');

const personService = require('./person.service');
const { idCorrecter } = require('./utils');

exports.countAllPeople = async (req, res) => {
  const people = await personService.findAll();
  res.json(people.length);
};

exports.getVaccinatedPeople = async (req, res) => {
  const vaccinatedPeople = await personService.findAll({ vaccine: { $nin: ['', null] } });
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

  const isVaccinated = !!person.vaccine;
  res.json(isVaccinated);
  return isVaccinated;
};

exports.createANewPerson = async (req, res, next) => {
  const { firstName, lastName } = req.body;
  let { vaccine } = req.body;
  const people = await personService.findAll();
  const _id = people.pop()._id + 1;

  if (!firstName || !lastName) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  vaccine = !vaccine ? vaccine = '' : vaccine;

  const newPerson = {
    _id,
    firstName,
    lastName,
    vaccine,
  };

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

  person.vaccine = vaccine;

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

  const filteredPeople = await personService.findAll({ vaccine });
  filteredPeople.forEach(async (person) => {
    await personService.delete(person._id);
  });

  res.json([]);
};

// Insertmany for backup data
/*
exports.insertMany = async (req, res) => {
  await personService.insertMany(req.body);
  res.status(201);
  res.json(req.body);
};
*/
