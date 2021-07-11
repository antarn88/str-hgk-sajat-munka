const express = require('express');
const { join } = require('path');
const createError = require('http-errors');

const {
  getFileContent,
  insertEntityToJsonList,
  updateEntityInJsonList,
  fileWriter,
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
controller.get('/:id/vaccinated', async (req, res) => {
  const people = await people$;
  const { id } = req.params;
  const person = people.find((p) => p.id === parseInt(id, 10));

  if (!person) {
    return res.sendStatus(404);
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
  const { id, vaccine } = req.params;

  const people = await people$;
  const person = people.find((p) => p.id === parseInt(id, 10));

  if (!person) {
    return next(new createError.NotFound('The person cannot be found!'));
  }

  try {
    const updatedPerson = await updateEntityInJsonList(id, { ...person, vaccine }, databasePath);
    res.json(updatedPerson);
    return updatedPerson;
  } catch (error) {
    return next(new createError.NotFound(error.message));
  }
});

// Delete people based on vaccine.
controller.delete('/:vaccine', async (req, res, next) => {
  const { vaccine } = req.params;
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
