const express = require('express');
const controller = require('./person.controller');

const router = express.Router();

// CREATE
router.post('/', (req, res, next) => controller.createANewPerson(req, res, next));
// router.post('/insertMany', (req, res) => controller.insertMany(req, res));

// READ
router.get('/:id', (req, res, next) => controller.findOne(req, res, next));
router.get('/count', (req, res) => controller.countAllPeople(req, res));
router.get('/vaccinated', (req, res) => controller.getVaccinatedPeople(req, res));
router.get('/:id/vaccinated', (req, res, next) => controller.isVaccinated(req, res, next));

// UPDATE
router.put('/:id/:vaccine', (req, res, next) => controller.updateTypeOfVaccine(req, res, next));

// DELETE
router.delete('/:vaccine', (req, res) => controller.deletePeopleWithCertainVaccine(req, res));

module.exports = router;
