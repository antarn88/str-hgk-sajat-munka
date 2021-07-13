/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const logger = require('./config/logger');
const Person = require('./models/person.model');
const app = require('./server');

describe('REST API integration tests', () => {
  const testPerson = {
    _id: 1,
    firstName: 'John',
    lastName: 'Test',
    vaccine: 'Moderna',
  };

  const updatedPerson = {
    _id: 1,
    firstName: 'Kate',
    lastName: 'Test',
    vaccine: 'Szputnyik V',
  };

  beforeEach((done) => {
    const { user, password, host } = config.get('database');
    (async () => {
      try {
        await mongoose.connect(`mongodb+srv://${user}:${password}@${host}`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        done();
      } catch (error) {
        logger.error(error.message);
        process.exit();
      }
    })();
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => mongoose.connection.close(() => done()));
  });

  test('PUT /person/:id', async () => {
    await Person.create(testPerson);
    const createdResponse = await supertest(app).get('/person/1').expect(200);

    expect(typeof createdResponse.body === 'object').toBeTruthy();
    expect(createdResponse.body._id).toBe(testPerson._id);
    expect(createdResponse.body.firstName).toBe(testPerson.firstName);
    expect(createdResponse.body.lastName).toBe(testPerson.lastName);
    expect(createdResponse.body.vaccine).toBe(testPerson.vaccine);

    const updatedResponse = await supertest(app).put('/person/1').send(updatedPerson).expect(200);

    expect(typeof updatedResponse.body === 'object').toBeTruthy();
    expect(updatedResponse.body._id).toBe(updatedPerson._id);
    expect(updatedResponse.body.firstName).toBe(updatedPerson.firstName);
    expect(updatedResponse.body.lastName).toBe(updatedPerson.lastName);
    expect(updatedResponse.body.vaccine).toBe(updatedPerson.vaccine);
  });

  test('DELETE /person/:id', async () => {
    await supertest(app).delete('/person/666').expect(404);
  });
});
