const express = require('express');
const controller = require('./person.controller');
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');

const router = express.Router();

// CREATE
router.post('/', authenticateJwt, adminOnly, (req, res, next) => controller.createANewPerson(req, res, next));

// READ
router.get('/count', authenticateJwt, (req, res) => controller.countAllPeople(req, res));
router.get('/vaccinated', authenticateJwt, (req, res) => controller.getVaccinatedPeople(req, res));
router.get('/:id/vaccinated', authenticateJwt, (req, res, next) => controller.isVaccinated(req, res, next));
router.get('/:id', authenticateJwt, (req, res, next) => controller.findOne(req, res, next));

// UPDATE
router.put('/:id/:vaccine', authenticateJwt, adminOnly, (req, res, next) => controller.updateTypeOfVaccine(req, res, next));

// DELETE
router.delete('/:vaccine', authenticateJwt, adminOnly, (req, res) => controller.deletePeopleWithCertainVaccine(req, res));

module.exports = router;
