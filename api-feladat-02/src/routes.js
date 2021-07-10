const express = require('express');
const { join } = require('path');
const createError = require('http-errors');

const { getFileContent, insertEntityToJsonList } = require('./utils');

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

module.exports = controller;
