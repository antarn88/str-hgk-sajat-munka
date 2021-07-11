/* eslint-disable no-restricted-globals */
const express = require('express');
const { join } = require('path');
const createError = require('http-errors');

const {
  getFileContent,
  insertEntityToJsonList,
  updateEntityInJsonList,
  fileWriter,
  idCorrecter,
} = require('./utils');

const controller = express.Router();

const databasePath = join(__dirname, '..', 'db', 'database.json');
const people$ = getFileContent(databasePath);

// Count all people.
controller.get('/count', async (req, res) => {
  const people = await people$;
  res.json(people.length);
});

// Get vaccinated people.
controller.get('/vaccinated', async (req, res) => {
  const people = await people$;
  const vaccinatedPeople = people.filter((person) => person.vaccine);
  res.json(vaccinatedPeople);
});

// Get status that person is vaccinated.
controller.get('/:id/vaccinated', async (req, res, next) => {
  const people = await people$;
  let { id } = req.params;

  if (!idCorrecter(id)) {
    return next(new createError.BadRequest('Bad person ID!'));
  }

  id = idCorrecter(id);

  const person = people.find((p) => p.id === id);

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

  if (!firstName || !lastName) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  vaccine = !vaccine ? vaccine = '' : vaccine;

  const newEntity = await insertEntityToJsonList({ firstName, lastName, vaccine }, databasePath);
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

  const people = await people$;
  const person = people.find((p) => p.id === id);

  if (!person) {
    return next(new createError.NotFound('The person cannot be found!'));
  }

  try {
    const updatedPerson = await updateEntityInJsonList(id, { ...person, vaccine }, databasePath);
    res.json(updatedPerson);
    return updatedPerson;
  } catch {
    return next(new createError.NotFound('The person cannot be found!'));
  }
});

// Delete people based on vaccine.
controller.delete('/:vaccine', async (req, res, next) => {
  let { vaccine } = req.params;

  vaccine = vaccine.trim();

  const people = await people$;
  const filteredPeople = people.filter((person) => person.vaccine !== vaccine);

  try {
    await fileWriter(databasePath, JSON.stringify(filteredPeople, null, 4));
    res.json(true);
    return true;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
});

module.exports = controller;
