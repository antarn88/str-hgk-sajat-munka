/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
const express = require('express');
const createError = require('http-errors');
const Person = require('./models/person.model');

const { idCorrecter } = require('./utils');

const controller = express.Router();

// Count all people.
controller.get('/count', async (req, res) => {
  const peopleCount = await Person.find().countDocuments();
  res.json(peopleCount);
});

// Get vaccinated people.
controller.get('/vaccinated', async (req, res) => {
  const vaccinatedPeople = await Person.find({ vaccine: { $nin: ['', null] } }).exec();
  res.json(vaccinatedPeople);
});

// Get status that person is vaccinated.
controller.get('/:id/vaccinated', async (req, res, next) => {
  let { id } = req.params;

  if (!idCorrecter(id)) {
    return next(new createError.BadRequest('Bad person ID!'));
  }

  id = idCorrecter(id);

  const person = await Person.findById(id).exec();

  if (!person) {
    return next(new createError.NotFound('The person cannot be found!'));
  }

  const isVaccinated = !!person.vaccine;
  res.json(isVaccinated);
  return isVaccinated;
});

// Create a new person.
controller.post('/', async (req, res, next) => {
  const { firstName, lastName } = req.body;
  let { vaccine } = req.body;
  const people = await Person.find().exec();
  const _id = people.pop()._id + 1;

  if (!firstName || !lastName) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  vaccine = !vaccine ? vaccine = '' : vaccine;

  const newPerson = new Person({
    _id,
    firstName,
    lastName,
    vaccine,
  });

  const newEntity = await newPerson.save();
  res.status(201);
  res.json(newEntity);
  return newEntity;
});

// Update type of vaccine.
controller.put('/:id/:vaccine', async (req, res, next) => {
  let { id, vaccine } = req.params;

  if (!idCorrecter(id)) {
    return next(new createError.BadRequest('Bad person ID!'));
  }

  id = idCorrecter(id);
  vaccine = vaccine.trim();

  const person = await Person.findById(id);

  if (!person) {
    return next(new createError.NotFound('The person cannot be found!'));
  }

  person.vaccine = vaccine;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person,
      {
        new: true,
        useFindAndModify: false,
      });
    res.json(updatedPerson);
    return updatedPerson;
  } catch {
    return next(new createError.NotFound('The person cannot be found!'));
  }
});

// Delete people based on vaccine.
controller.delete('/:vaccine', async (req, res) => {
  let { vaccine } = req.params;
  vaccine = vaccine.trim();

  const filteredPeople = await Person.find({ vaccine });
  filteredPeople.forEach(async (person) => {
    await Person.findByIdAndDelete(person._id);
  });

  res.json([]);
});

// Insertmany for backup data
/*
controller.post('/insertmany', async (req, res) => {
  await Person.insertMany(req.body);
  res.status(201);
  res.json(req.body);
});
*/
module.exports = controller;
